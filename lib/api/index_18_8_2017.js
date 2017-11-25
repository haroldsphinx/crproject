/*------------------------------------------------------
 APIs
 ---------------------------------------------------------*/


var express = require('express');
var app = module.exports = express();
var login_process = require('../login/process');
var match_process = require('../match/process');


app.set('views', __dirname);
app.set('view engine', 'ejs');

var hash = require('../../pass').hash;




app.post('/api/login', function (req, res) {
    console.log("call into api login");

    login_process.check_api(req, hash, function (result) {

        console.log(result);
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            var user_data = {
                'user_id': result[0].user_id,
                'username': result[0].username,
                'device_id': req.body.device_id,
                'device_type': req.body.device_type,
            }
            login_process.update_login_data(req, user_data);

            var json_return = {"response_status": "1", "message": "Login Successfully", "data": user_data};
            //return json_return;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        } else {
            // res.setHeader('Content-Type', 'application/json');
            var json_return = {"response_status": "0", "message": "Sorry! This user is not register yet, Please Contact to administrator."};
            //return json_return;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        }
    });

});

app.post('/api/getMatchList', function (req, res) {
    console.log("call into api login");

    match_process.getMatchListAPI(req, function (status, result) {
//Key = status
        console.log(result);
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            var json_return = {"response_status": "1", "message": "Team data", "data": result};
            //return json_return;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        } else {
            res.setHeader('Content-Type', 'application/json');
            var json_return = {"response_status": "0", "message": "Sorry! This user is not register yet, Please Contact to administrator."};
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        }
    });

});

app.post('/api/getStaticPage', function (req, res) {
    //console.log("call into api login");
    var fs = require('fs')
//var file = fs.readFileSync('/path/to/small.png', 'utf8');
    var page = req.body.page;
    if (page == 'terms' || page == 'privacy' || page == 'about') {
        var contents = fs.readFileSync(page + '.html', 'utf8').toString();

        res.setHeader('Content-Type', 'application/json');
        var json_return = {"response_status": "1", "message": "Success!", "data": contents};
        //return json_return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json_return));

    } else {
        var json_return = {"response_status": "0", "message": "Sorry! No page Found."};
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json_return));
    }
});

app.post('/api/RegisterRequest', function (req, res) {
    //console.log("call into api login");
    var registerrequest_process = require('../registerrequest/process');
    registerrequest_process.save(req, function (status, result) {
//Key = status
        console.log(result);
        if (status) {
            res.setHeader('Content-Type', 'application/json');
            var json_return = {"response_status": "1", "message": "Message sent!", "data": result};
            //return json_return;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        } else {
            res.setHeader('Content-Type', 'application/json');
            var json_return = {"response_status": "0", "message": "Opps! Message not sent!"};
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        }
    });

});

app.post('/api/getUserProfile', function (req, res) {

    var users_process = require('../users/process');
    if (req.body.id != '') {
        users_process.getUserProfile(req, function (status, result) {

            if (status) {
                res.setHeader('Content-Type', 'application/json');
                var json_return = {"response_status": "1", "message": "user data", "data": result[0]};
                //return json_return;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(json_return));
            } else {
                res.setHeader('Content-Type', 'application/json');
                var json_return = {"response_status": "0", "message": "Sorry! This user is not register yet, Please Contact to administrator."};
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(json_return));
            }
        });
    } else {
        var json_return = {"response_status": "0", "message": "Sorry! No record Found."};
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json_return));
    }

});

app.post('/api/changePassword', function (req, res) {

    var users_process = require('../users/process');
    if (req.body.id != '' && req.body.password != '') {
        users_process.changepassword(req, hash, function (status, result) {

            if (status) {
                res.setHeader('Content-Type', 'application/json');
                var json_return = {"response_status": "1", "message": "user password updated"};
                //return json_return;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(json_return));
            } else {
                res.setHeader('Content-Type', 'application/json');
                var json_return = {"response_status": "0", "message": "Sorry! This user is not register yet, Please Contact to administrator."};
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(json_return));
            }
        });
    } else {
        var json_return = {"response_status": "0", "message": "Sorry! No record Found."};
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json_return));
    }

});