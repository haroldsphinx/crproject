var express = require('express');
var app = module.exports = express();
var process = require('./process');
//var hash = require('../../pass').hash;
var globals = require('../globals'); //<< globals.js path
var FCM = require('fcm-push');
app.set('views', __dirname);
app.set('view engine', 'ejs');
var serverKey = globals.serverKey;
var LIMIT = 10;

/*-------------------------------------------------
 Just a simple Pagination here, You can wrote your 
 own advanced Pagination
 ---------------------------------------------------*/
//
//function paging(total, curr_page, url) {
//
//    var page = '';
//    var total_page = Math.ceil(total / LIMIT);
//
//    if (total > LIMIT) {
//
//        page = '<ul class="pagination">';
//
//        if (parseInt(curr_page) > 1)
//            page += '<li><a href="' + url + (parseInt(curr_page) - 1) + '">Prev</a></li>';
//
//        for (x = 1; x <= total_page; x++) {
//
//            var active = '';
//
//            if (x == curr_page)
//                active = 'class="active"';
//
//            page += '<li ' + active + '><a href="' + url + x + '">' + x + '</a></li>';
//
//        }
//        if (parseInt(curr_page) < total_page)
//            page += '<li><a href="' + url + (parseInt(curr_page) + 1) + '">Next</a></li>';
//
//        page += '</ul>';
//
//        var x_showed = LIMIT;
//        if (total < LIMIT)
//            x_showed = total
//
//        page += '<div class="pull-right" style="margin-top:2px">'
//                + '<h5>'
//                + ' <small>Displaying ' + x_showed + ' of Total ' + total + ' Item(s)</small>'
//                + '</h5>'
//                + '</div>';
//    }
//
//    return page;
//}

app.get('/notifications', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');

//    var curr_page = (req.query.page != undefined) ? req.query.page : 1;
//    var filter_by = (req.query.f != undefined) ? req.query.f : "";
//    var qsearch = (req.query.q != undefined) ? req.query.q : "";
//    var page = (req.query.page != undefined) ? req.query.page : 0;
//    var offset = (page == 0) ? 0 : (page - 1) * LIMIT;
//
//    /*Params for DB*/
//    var xparams = {
//        curr_page: curr_page,
//        filter_by: filter_by,
//        qsearch: qsearch,
//        offset: offset,
//        limit: LIMIT
//    }

//    process.getNotificationsData(req, function (status, data) {

    // var url = '/register-request?sort_by=' + filter_by + '&q=' + qsearch + '&page=';
    //console.log("-------------------------88888888888888888888");
    //console.log(data);

    var params = {
        title: 'Notificaitons',
        data: "",
//            total_data: total_data,
//            pagination: paging(total_data, curr_page, url),
//            curr_page: curr_page,
//            curr_filt: filter_by,
//            curr_search: qsearch,
        sess_user: (req.session.username) ? req.session.username : '',
        active_page: 'notifications'
    };
    //console.log(params);
    res.render('notifications.ejs', params);
    //});

});

//Send Notifications
app.post('/notifications/send', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');

    process.getAllClientsCounts(req, function (err, counts) {
        if (err)
            console.log("error getting all clients");

        var allclients = counts;
        var chunks = 1000;
        var batches = allclients / chunks; // Number of while-loop calls - around .
        var data = JSON.parse(JSON.stringify(req.body));
        var title = data.title;
        var body = data.body;
        var fcm = new FCM(serverKey);
        for (var z = 0; z <= batches; z++) {
            var offset = z * chunks; // db Limit offset number

            var para = {
                offset: offset,
                limit: chunks,
            }
            process.getClients(req, para, function (req, result) {
                // var team_data = team_data;

//        var params = {
//            title: 'Send Notifications',
//            result_data: result,
//            sess_user: (req.session.username) ? req.session.username : '',
//            active_page: 'notifications'
//        };
//        console.log("serverkey---->"+serverKey);
                console.log(result);
                var message = {
                    registration_ids: result,
                    collapse_key: 'your_collapse_key',
                    data: {
                         match_id: null,
                    },
                    notification: {
                        title: title,
                        body: body,
                        sound: "default",
                        click_action: "HomeActivity",
                    }
                };
//callback style
                fcm.send(message, function (err, response) {
                    if (err) {
                        console.log("--------------------");
                        console.log(err);
                        console.log("Something has gone wrong!");
                    } else {
                        //var response = JSON.parse(JSON.stringify(response));
                        console.log("Successfully sent with response: ", response);
//                        console.log("Success: ", response.success);
//                        console.log(response.failure);
//                        console.log(response["success"]);
//                        console.log(response.results);
//                        console.log(response);
                    }
                });

            });
        }

//        var params = {
//            title: 'Notificaitons',
//            data: "",
//            sess_user: (req.session.username) ? req.session.username : '',
//            active_page: 'notifications'
//        };
        //res.render('notifications.ejs', params);
        res.redirect('/notifications');
    });
});

app.post('/notifications/pushsend', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');

    process.getAllClientsCounts(req, function (err, counts) {
        if (err)
            console.log("error getting all clients");

        var allclients = counts;
        var chunks = 1000;
        var batches = allclients / chunks; // Number of while-loop calls - around .
        var data = JSON.parse(JSON.stringify(req.body));
        var title = "Cricket Fast Live Line";
        var body = data.message;
        var match_id = data.match_id;
        var redirect_uri = "/match/edit-score/" + data.match_id;
        var fcm = new FCM(serverKey);

        for (var z = 0; z <= batches; z++) {
            var offset = z * chunks; // db Limit offset number

            var para = {
                offset: offset,
                limit: chunks,
            }
            process.getClients(req, para, function (req, result) {
                // var team_data = team_data;

//        var params = {
//            title: 'Send Notifications',
//            result_data: result,
//            sess_user: (req.session.username) ? req.session.username : '',
//            active_page: 'notifications'
//        };
//        console.log("serverkey---->"+serverKey);
                console.log(result);
                var message = {
                    registration_ids: result,
                    collapse_key: 'your_collapse_key',
                    data: {
                        match_id: match_id,
                    },
                    notification: {
                        title: title,
                        body: body,
                        sound: "default",
//                        subtitle: "This is subtitle",
                        click_action: "MatchLiveLineActivity",
                    }
                };
//callback style
                fcm.send(message, function (err, response) {
                    if (err) {
                        console.log("--------------------");
                        console.log(err);
                        console.log("Something has gone wrong!");
                    } else {
                        //var response = JSON.parse(JSON.stringify(response));
                        console.log("Successfully sent with response: ", response);
//                        console.log("Success: ", response.success);
//                        console.log(response.failure);
//                        console.log(response["success"]);
//                        console.log(response.results);
//                        console.log(response);
                    }
                });

            });
        }
//        var params = {
//            title: 'Notificaitons',
//            data: "",
//            sess_user: (req.session.username) ? req.session.username : '',
//            active_page: 'notifications'
//        };
        //res.render('notifications.ejs', params);
        res.redirect(redirect_uri);
    });
});