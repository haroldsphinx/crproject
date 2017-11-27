/*------------------------------------------------------
 APIs
 ---------------------------------------------------------*/


var express = require('express');
var app = module.exports = express();
var login_process = require('../login/process');
var match_process = require('../match/process');
var users_process = require('../users/process');
var dateFormat = require('dateformat');

app.set('views', __dirname);
app.set('view engine', 'ejs');

var hash = require('../../pass').hash;


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/api/login', function (req, res) {

    login_process.check_api(req, hash, function (result, msg) {

        console.log(result);



        if (result) {
            res.setHeader('Content-Type', 'application/json');

            var current_date = dateFormat('', 'yyyy-mm-dd');

            var Enddate = dateFormat(result[0].enddate, 'yyyy-mm-dd');

//            console.log(current_date);
//            console.log(Enddate)
//            console.log(result[0].enddate);

            if (current_date < Enddate) {
                var membership_flag = "1";
            } else {
                var membership_flag = "0";
            }

            var user_data = {
                'user_id': result[0].user_id,
                'username': result[0].username,
                'device_id': req.body.device_id,
                'device_type': req.body.device_type,
                'membership_flag': membership_flag
            }
            login_process.update_login_data(req, user_data);

            var json_return = {"response_status": "1", "message": "Login Successfully", "data": user_data};
            //return json_return;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        } else {
            // res.setHeader('Content-Type', 'application/json');
            var json_return = {"response_status": "0", "message": msg};
            //return json_return;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        }
    });

});

app.post('/api/logout', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    login_process.update_logout_data(req, function (result) {
        if (result) {
            var json_return = {"response_status": "1", "message": "Logout Successfully"};
            //return json_return;
        } else {
            var json_return = {"response_status": "0", "message": "Logout Failed!"};
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json_return));


    });
});

app.post('/api/checkMembershipFlag', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    login_process.check_membership_flag(req, function (result, rows) {
        if (result) {
            var current_date = dateFormat('', 'yyyy-mm-dd');

            var Enddate = dateFormat(rows[0].enddate, 'yyyy-mm-dd');

//            console.log(current_date);
//            console.log(Enddate)
//            console.log(result[0].enddate);


            if (current_date < Enddate) {
                var data = {
                    "membership_flag": "1"
                };
            } else {
                var data = {
                    "membership_flag": "0"
                };
            }
            var json_return = {"response_status": "1", "data": data, "message": "result found!"};
            //return json_return;
        } else {
            var json_return = {"response_status": "0", "message": "Something went wrong!"};
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json_return));


    });
});

app.post('/api/getMatchList', function (req, res) {

    match_process.getMatchListAPI(req, function (status, result) {
//Key = status
    console.log("result of match list api");
        console.log(result);
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            var json_return = {"response_status": "1", "message": "Team data", "data": result};
            //return json_return;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json_return));
        } else {
            res.setHeader('Content-Type', 'application/json');
            var json_return = {"response_status": "0", "message": "Sorry! Something went wrong. Try Again."};
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
    if (!req.body.email) {
        var json_return = {"response_status": "0", "message": "Opps! missing required fields!"};
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json_return))
    }

    registerrequest_process.save(req, function (status, result) {
//Key = status
        console.log(result);
        if (status) {
//            res.setHeader('Content-Type', 'application/json');
//           // console.log("got in 1");
//            //Store to login
//            req.body.startdate = dateFormat("", 'yyyy-mm-dd');
//            var oneWeekAfter = new Date();
//            oneWeekAfter.setDate(oneWeekAfter.getDate() + 7);
//            req.body.enddate = dateFormat(oneWeekAfter, 'yyyy-mm-dd');
//            req.body.amount = "0";
//            req.body.type_of_membership = "normal_user";
//            req.body.status = "1";
//           // console.log("-------REQUESTS-----");
//           // console.log(req.body);
//            users_process.save(req, hash, function (status, msg) {
//
//                //console.log("Status : %s , message : %s ", status, msg);
//                // res.type('json');
//                if (!status) {
//                    var json_return = {"response_status": "0", "message": msg};
//                } else {
//                    var json_return = {"response_status": "2", "message": "Your account has been created successfully! Please Login!"};
//                }

                //Before auto register
                var json_return = {"response_status": "1", "message": "Your request has been sent successfully!"};
                //return json_return;
                //End before auto register
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(json_return));
            //});
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

app.post('/api/appStatus', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var json_return = {"response_status": "0", "message": "This Application is Free until 10th September 2017!"};
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json_return));
});