var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = module.exports = express();
var http = require('http');
var dateFormat = require('dateformat');
var match_process = require('./lib/match/process.js');
var clients_process = require('./lib/clients/process.js');
var cricapi_process = require('./lib/cricapi/process.js');
//Websocket intial
var Websocket = require('ws');
var s = new Websocket.Server({port: 5002});
var fileUpload = require('express-fileupload');
var globals = require('./lib/globals'); //<< globals.js path
// default options 
app.use(fileUpload());

var db = require('./lib/db');
//MongoClient.connect('mongodb://hardik_test:hardik_test@ds157325.mlab.com:57325/hardik_test', function (err, database) {
db.connect(globals.db_url, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    }
});

/*----------------------------------
 Setup main environments
 ------------------------------------*/
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.set('views', __dirname);
app.use(express.static(__dirname + '/public')); // set this for static load assests
app.set('view engine', 'ejs');

app.use(cookieParser('CricCommentary, storing cookies'));
app.use(session({
    secret: 'CricCommentary secret',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
//app.use(express.cookieParser('CricCommentary, storing cookies'));
//app.use(express.session());

/*----------------------------------------------------------
 Every lib/module folder created, need to be registered here
 ------------------------------------------------------------*/
var login = require('./lib/login');
var users = require('./lib/users');
var dashboard = require('./lib/dashboard');
var team = require('./lib/team');
var match = require('./lib/match');
//var registerrequest = require('./lib/registerrequest');
var clients = require('./lib/clients');
//
var api = require('./lib/api');
var cricapi = require('./lib/cricapi');
var notifications = require('./lib/notifications');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(login);
app.use(users);
app.use(dashboard);
app.use(team);
app.use(match);
//app.use(registerrequest);
app.use(clients);
//
app.use(api);
app.use(cricapi);
app.use(notifications);




/*---------------------------------------------
 handle Errors
 ----------------------------------------------*/
app.use(function (req, res, fn) {
    res.render('error_page', {status: 404, url: req.url, error: 'Oooops ! Page not Found'});
});

app.use(function (err, req, res, next) {
    res.render('error_page', {
        status: err.status || 500
        , error: err
    });
});
//app.use(app.router);

/*Create server*/
http.createServer(app).listen(app.get('port'), function () {
    console.log('Listening port : %s ', app.get('port'));
});

var CLIENTS = {};

s.on('connection', function (ws, req) {

    ws.on('message', function (message) {
        message = JSON.parse(message);
        console.log("-----------------Broadcast message START---------------");
        console.log(message);
        console.log("-----------------Broadcast message END---------------");

        /*
         ***************************** Match data Broadcast *****************************
         * 
         */
//        
        if (message.type === 'broadcast' && message.id === 'socket_admin') {
//            console.log(message);
//            console.log("Message recieved");
            // console.log(global.data_to_store);
            var match_id = message.data.match_id;
            match_process.saveUpdateStates(message.data.data_to_store, match_id, function (err, result) {
                console.log("============ Send data broadcast ================");
                console.log(result);
                console.log("============ END data broadcast ================");
                var all_saved_data = result;

                s.clients.forEach(function e(client) {
                    //client = current user
                    //ws = all other clients
                    //if (client != ws) {
//                 console.log(client);
//                console.log(client.readyState);
//                console.log(Websocket.OPEN);
                    if (client.readyState === Websocket.OPEN) {
                        //client !== ws &&  (use this condition to not sent to own)
                        client.send(
                                JSON.stringify({
                                    name: 'states_updates',
                                    type: 'broadcast_api',
                                    api: 'getMatchDetailAPI',
                                    response_status: '1',
                                    status: "detail_states",
                                    //id: message.id,
                                    // data: message.data,
                                    data: all_saved_data
                                }), function ack(error) {
                            // If error is not defined, the send has been completed, otherwise the error
                            // object will indicate what failed.
                            if (error) {
                                console.log("--error--");
                                console.log(error);
                            }
                        });
                    }
                    //}
                });
//Save DaTa
//            var match_id = message.data.match_id;
//            var savedata = match_process.saveUpdateStates(Myconnection, message.data.data_to_store, match_id);
            });
        }

        /*
         ***************************** Message of the Day *****************************
         
         */
        if (message.type === 'connection_open' && message.id === 'socket_admin') {
            console.log("got in message of the day");

            //var query = Myconnection.query('SELECT * FROM `match` as m LEFT JOIN `states` as s on `s`.`match_id` = `m`.`match_id` WHERE `m`.`status`="started" ORDER By `m`.`match_id` DESC LIMIT 10', [], function (err, rows)
//            var query = Myconnection.query('SELECT `s`.*,`m`.*,`ss`.`session_1`, `ss`.`session_2`, `ss`.`over` as session_over, `ss`.`numbe_eleven`, `ss`.`favorite` FROM `match` as m LEFT JOIN `states` as s on `s`.`match_id` = `m`.`match_id` LEFT JOIN `session` as `ss` ON `ss`.`match_key` = `m`.`match_id` WHERE `m`.`status`="started" ORDER By `m`.`match_id` DESC LIMIT 10', [], function (err, rows)
//            {
//                if (err) {
//                    console.log(err);
//                }
            ws.send(
                    JSON.stringify({
                        type: 'connection_open',
                        response_status: '1',
                        //data: rows
                    }), function ack(error) {
                // If error is not defined, the send has been completed, otherwise the error
                // object will indicate what failed.
                if (error) {
                    console.log("--error--");
                    console.log(error);
                }
            });
            //});
//            console.log(query.sql);

            var web_socket_key = req.headers['sec-websocket-key'];//message.uid;
            //  var device = {"device_id" : message.uid};
            //ws = ws.concat(device);
            CLIENTS[web_socket_key] = ws;

            // console.log("client added");
            // console.log(CLIENTS);
            var clients_data_to_store = {
                websocket_key: web_socket_key,
                device_id: message.uid,
                device_type: message.utype,
                updated_at: dateFormat("", 'yyyy-mm-dd HH:MM:ss'),
                status: 'online'
            };
            //console.log(clients_data_to_store);
            clients_process.saveUpdateClients(clients_data_to_store, message.uid, function (result, message) {
                console.log(message);
            });

        }
//        if (message.type === 'connection_close' && message.id === 'socket_admin') {
//            console.log("connection close");
//            var uid = message.uid;
//            delete CLIENTS[uid];
//            console.log("client deleted");
//            console.log(CLIENTS);
//        }
        /*
         * **************** Session data Broadcast ******************************************
         * 
         */
//
        if (message.type === 'broadcast_session' && message.id === 'socket_admin') {
            //console.log(message);
            //console.log("Message recieved");
            var match_id = message.data.match_id;
            match_process.saveUpdateSession(message.data.data_to_store, match_id, function (err, result) {
                //console.log(result);
                var all_saved_data = result;
                // console.log(global.data_to_store);
                s.clients.forEach(function e(client) {
                    //client = current user
                    //ws = all other clients
                    //if (client != ws) {
//                 console.log(client);
//                console.log(client.readyState);
//                console.log(Websocket.OPEN);
                    if (client.readyState === Websocket.OPEN) {
                        //client !== ws &&  (use this condition to not sent to own)
                        client.send(
                                JSON.stringify({
                                    name: 'session_updates',
                                    type: 'broadcast_api',
                                    api: 'getMatchDetailAPI',
                                    response_status: '1',
                                    status: "detail_session",
                                    //id: message.id,
                                    // data: message.data,
                                    data: all_saved_data
                                }), function ack(error) {
                            // If error is not defined, the send has been completed, otherwise the error
                            // object will indicate what failed.
                            if (error) {
                                console.log("--error--");
                                console.log(error);
                            }
                        });
                    }
                    //}
                });
            });
//Save DaTa
            //var match_id = message.data.match_id;
            //var savedata = match_process.saveUpdateSession(Myconnection, message.data.data_to_store, match_id);

        }

        /*
         * **************** API data Broadcast ******************************************
         * 
         */
//
        if (message.type === 'broadcast_api' && message.id === 'socket_admin') {

            var api = message.data.api;
            var params = message.data.params;
            console.log("=========== api params ==========");
            console.log(params);
            console.log("=========== api params END==========");
            console.log("api call - " + api);
            if (api == 'getMatchListAPI') {
                match_process.getMatchListAPI(params, function (status, result) {
                    s.clients.forEach(function e(client) {
                        if (client.readyState === Websocket.OPEN) {
                            //client !== ws &&  (use this condition to not sent to own)
                            client.send(
                                    JSON.stringify({
                                        name: 'api_1',
                                        type: 'broadcast_api',
                                        status: params.status,
                                        response_status: '1',
                                        api: 'getMatchListAPI',
                                        data: result
                                    }), function ack(error) {
                                // If error is not defined, the send has been completed, otherwise the error
                                // object will indicate what failed.
                                if (error) {
                                    console.log("--error--");
                                    console.log(error);
                                }
                            });
                        }
                        //}
                    });

                });
            } else if (api == 'getCricAPI') {
                cricapi_process.getCricAPI(params, function (error, result) {
                    console.log("====================== getCricAPI ==================");
                    console.log(result);
                    console.log("====================== getCricAPI END==================");
                    s.clients.forEach(function e(client) {
                        if (client.readyState === Websocket.OPEN) {
                            //client !== ws &&  (use this condition to not sent to own)
                            client.send(
                                    JSON.stringify({
                                        name: 'api_2',
                                        type: 'broadcast_api',
                                        api: 'getCricAPI',
                                        response_status: '1',
                                        data: result,
                                        status: 'fullscorecard',
                                    }), function ack(error) {
                                // If error is not defined, the send has been completed, otherwise the error
                                // object will indicate what failed.
                                if (error) {
                                    console.log("--error--");
                                    console.log(error);
                                }
                            });
                        }
                        //}
                    });

                });
            } else if (api == 'getStaticPage') {

                var fs = require('fs')
//var file = fs.readFileSync('/path/to/small.png', 'utf8');
                var page = params.page;
                if (page == 'terms' || page == 'privacy' || page == 'about') {
                    var contents = fs.readFileSync(page + '.html', 'utf8').toString();
                    s.clients.forEach(function e(client) {
                        if (client.readyState === Websocket.OPEN) {
                            //client !== ws &&  (use this condition to not sent to own)
                            client.send(
                                    JSON.stringify({
                                        name: 'api_3',
                                        type: 'broadcast_api',
                                        response_status: '1',
                                        api: 'getStaticPage',
                                        data: contents
                                    }), function ack(error) {
                                // If error is not defined, the send has been completed, otherwise the error
                                // object will indicate what failed.
                                if (error) {
                                    console.log("--error--");
                                    console.log(error);
                                }
                            });
                        }
                        //}
                    });
                }

            } else if (api == 'getMatchDetailAPI') {

                match_process.getMatchDetailAPI(params, function (error, result) {
                    console.log("======= getMatchDetailAPI ======");
                    console.log(result);
                    if (error) {
                        console.log("!!error!!");
                        console.log(error);
                    }
                    s.clients.forEach(function e(client) {
                        if (client.readyState === Websocket.OPEN) {
                            //client !== ws &&  (use this condition to not sent to own)
                            client.send(
                                    JSON.stringify({
                                        name: 'api_4',
                                        status: 'detail_all',
                                        type: 'broadcast_api',
                                        response_status: '1',
                                        api: 'getMatchDetailAPI',
                                        data: result
                                    }), function ack(error) {
                                // If error is not defined, the send has been completed, otherwise the error
                                // object will indicate what failed.
                                if (error) {
                                    console.log("--error--");
                                    console.log(error);
                                }
                            });
                        }
                        //}
                    });

                });

            } else if (api == 'getCricStartedMatchAPI') {
                console.log("***************************");
                console.log("api: ", api);
                console.log("*********************");
                match_process.getCricStartedMatchAPI(params, function (error, result) {
                    console.log("======= getCricStartedMatchAPI ======");
                    console.log(result);
                    if (error) {
                        console.log("!!error!!");
                        console.log(error);
                    }
                    s.clients.forEach(function e(client) {
                        if (client.readyState === Websocket.OPEN) {
                            //client !== ws &&  (use this condition to not sent to own)
                            client.send(
                                    JSON.stringify({
                                        name: 'api_5',
                                        status: 'cric_started_matches',
                                        type: 'broadcast_api',
                                        response_status: '1',
                                        api: 'getCricStartedMatchAPI',
                                        data: result
                                    }), function ack(error) {
                                // If error is not defined, the send has been completed, otherwise the error
                                // object will indicate what failed.
                                if (error) {
                                    console.log("--error--");
                                    console.log(error);
                                }
                            });
                        }
                        //}
                    });

                });

            }
        }

    });

    ws.on('open', function () {
        // console.log("one.................");
    });

    ws.on('close', function () {
        ///CLIENTS.shift();.
        //console.log(CLIENTS);
        console.log("I lost a client!");
        delete CLIENTS[req.headers['sec-websocket-key']];
        //console.log(CLIENTS);
        var clients_data_to_store = {
            updated_at: dateFormat("", 'yyyy-mm-dd HH:MM:ss'),
            status: 'offline'
        };
        clients_process.updateClientsStatus(clients_data_to_store, req.headers['sec-websocket-key'], function (result, message) {
            console.log(message);
        });
    });


    //console.log("One more client connected--!");
    // console.log("total client->" + CLIENTS.length);
});