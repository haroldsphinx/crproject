/*--------------------------------------------------------------
 Login Check Logic
 =====================
 1. First Chek wether requested Username exist in DB (fetch_user)
 2. no return Error,
 3. if yes, get the password_hash n salt
 4. Authenticate them, match the password hash to salt given (authenticate)
 5. Done
 
 ----------------------------------------------------------------*/
//var globals = require('../globals'); //<< globals.js path
//var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('../db');
/*fetch the User*/
function fetch_user(req, done) {

//    req.getConnection(function (err, connection) {
//
//        var query = connection.query("SELECT * FROM user WHERE ??  = ? and ?? = '?' and ?? = ?", ['username', req.body.username, 'status', 1, 'type_of_membership', 'admin'], function (err, rows, fields) {
//
//            if (err) {
//
//                console.log("Error %s", err);
//                done(false);
//            }
//            else {
//
//                if (rows.length > 0)
//                    done(rows);
//                else
//                    done(false);
//            }
//        });
//
//        //in case we want ro print te raw sql
//        console.log(query.sql);
//
//    });

//Mongo query
//    MongoClient.connect(globals.db_url, function (err, db) {
//        if (err)
//            return console.log(err);
        db.get().collection('user').findOne({'username': req.body.username, 'status': 1, 'type_of_membership': 'admin'},
        function (err, results) {
            if (err) {
                console.log("Error %s", err);
                done(false);
            }
            else {
                console.log(results);
                if (results)
                    done(results);
                else
                    done(false);
            }
//            db.close();
        });
   // });

}

function fetch_user_api(req, done) {
//    console.log("got in fetch user api");
//    req.getConnection(function (err, connection) {
//        console.log(req.body);
//        var query = connection.query("SELECT * FROM user WHERE ??  = ? and ?? = '?'", ['username', req.body.username, 'status', 1], function (err, rows, fields) {
//
//            if (err) {
//
//                console.log("Error %s", err);
//                done(false);
//            }
//            else {
//
//                if (rows.length > 0)
//                    done(rows);
//                else
//                    done(false);
//            }
//        });
//
//        //in case we want ro print te raw sql
//        console.log(query.sql);
//
//    });

    //Mongo query
//    MongoClient.connect(globals.db_url, function (err, db) {
//        if (err)
//            return console.log(err);
        db.get().collection('user').findOne({'username': req.body.username, 'status': 1},
        function (err, results) {
            if (err) {
                console.log("Error %s", err);
                done(false);
            }
            else {
                console.log(results);
                if (results)
                    done(results);
                else
                    done(false);
            }
            //db.close();
        });
   // });

}

/*Authenticate the Password*/
function authenticate(req, hash, mode, fn) {

    if (!module.parent)
        console.log('authenticating %s:%s', req.body.username, req.body.password);
    if (mode != 'api') {
        fetch_user(req, function (jsonData) {
            console.log("----json-data----");
            console.log(jsonData);
            if (!jsonData)
                return fn(false);

            if (jsonData.username == req.body.username) {

                /*From database*/
                var password_salt = jsonData.password_salt;
                var password_hash = jsonData.password_hash;
                hash(req.body.password, password_salt, function (err, hash_pass) {

                    if (err) {
                        console.log(err);
                        return fn(false);
                    }

                    if (password_hash == hash_pass) {
                        //check if the hash is the same
                        var arr_ret = new Array();
                        var obj = {};
                        var o_id = new ObjectID(jsonData._id);
                        obj['username'] = jsonData.username;
                        obj['user_id'] = o_id;
                        arr_ret.push(obj);

                        console.log("Password match");
                        console.log(arr_ret);
                        return fn(arr_ret);

                    } else {

                        //console.log("Password did not match");
                        return fn(false);
                    }
                });
            }
            else {

                console.log("No username match in DB");
                return fn(false);
            }
        });
    } else {
        fetch_user_api(req, function (jsonData) {

            if (!jsonData)
                return fn(false, "Opps! No User match!");

            if (jsonData.username == req.body.username) {

                /*From database*/
                var password_salt = jsonData.password_salt;
                var password_hash = jsonData.password_hash;
                hash(req.body.password, password_salt, function (err, hash_pass) {

                    if (err) {

                        console.log(err);
                        return fn(false, err);
                    }

                    if (password_hash == hash_pass) { //check if the hash is the same

                        var arr_ret = new Array();
                        var obj = {};
                        var o_id = new ObjectID(jsonData._id);
                        obj['username'] = jsonData.username;
                        obj['user_id'] = o_id;
                        obj['type_of_membership'] = jsonData.type_of_membership;
                        obj['startdate'] = jsonData.startdate;
                        obj['enddate'] = jsonData.enddate;
                        obj['logged_in'] = jsonData.logged_in;
                        arr_ret.push(obj);


                        //console.log("Password match");
                        if (jsonData[0].logged_in == "1") {
                            return fn(false, "Opps! User has already logged in into other device!");
                        }
                        return fn(arr_ret, "User data success!");

                    } else {

                        //console.log("Password did not match");
                        return fn(false, "Opps! Password did not match!");
                    }
                });
            }
            else {

                console.log("Opps! No username match in DB");
                return fn(false, "Opps! No User match!");
            }
        });
    }
}

/*------------------------------------------
 Adding users
 Need to include hash
 -------------------------------------------*/
exports.update_login_data = function (req, user) {

    req.getConnection(function (err, connection) {
        update = {
            device_id: req.body.device_id,
            device_type: req.body.device_type,
            logged_in: "1"
        };

        connection.query("UPDATE user set ? WHERE id = ? ", [update, user.user_id], function (err, rows)
        {
            if (err)
                return false;

            return  true;
        });
    });
}

exports.update_logout_data = function (req, fn) {

    req.getConnection(function (err, connection) {
        update = {
            logged_in: "0"
        };

        connection.query("UPDATE user set ? WHERE id = ? ", [update, req.body.user_id], function (err, rows)
        {
            if (err)
                return fn(false);

            return  fn(true);
        });
    });
}

exports.check_membership_flag = function (req, fn) {

    req.getConnection(function (err, connection) {

        connection.query("select `startdate`,`enddate` from user WHERE id = ? LIMIT 1", [req.body.user_id], function (err, rows)
        {
            if (err)
                return fn(false, rows);

            return  fn(true, rows);
        });
    });
}

exports.check = function (req, hash, fn) {

    authenticate(req, hash, 'site', function (result) {
console.log(result);
        if (!result)
            return fn(false);

        req.session.regenerate(function () {

            req.session.username = result[0].username;
            req.session.user_id = result[0].user_id;
            req.session.base_url = req.protocol + '://' + req.get('host');
            global.base_url = req.protocol + '://' + req.get('host');
            console.log("base url: " + global.base_url);
            console.log("User { Username :%s , ID : %s } is Logged in", req.session.username, req.session.user_id);
            return fn(true);

        });

    });

};

exports.check_api = function (req, hash, fn) {

    authenticate(req, hash, 'api', function (result, msg) {
        return fn(result, msg);
    });

};

/*------------------------------------------
 SEEDING is importan to put a First user 
 along with the password and username
 ------------------------------------------*/

exports.seeding = function (req, hash, fn) {

    /*----------------------------------------------
     Set it in Global like this,so it can be accessed
     inside the callback function below
     ------------------------------------------------*/
    var users = {
        tj: {username: 'admin'}  // set username
    };
    //set password = admin123
    hash('admin123', function (err, salt, hash) {
        if (err)
            throw err;
        users.tj.salt = salt;
        users.tj.hash = hash;

        /*Seeding db*/
//        req.getConnection(function (err, connection) {
//
//            var exape = {username: users.tj.username, password_salt: users.tj.salt, password_hash: users.tj.hash};
//            connection.query("INSERT INTO user set ? ", exape, function (err, rows) {
//
//                if (err) {
//
//                    return fn(false, err);
//
//                } else {
//
//                    return fn(true, " Seeding's done");
//                }
//
//            });
//        });

        //Mongo query
        var myobj = {username: users.tj.username, password_salt: users.tj.salt, password_hash: users.tj.hash, type_of_membership: 'admin', device_id: 123456, device_type: 'Ios', status: 1};
//        MongoClient.connect(globals.db_url, function (err, db) {
//            if (err)
//                return console.log(err);
            db.get().collection('user').save(myobj, function (err, result) {
                //db.close();
                if (err) {
                    return fn(false, err);
                } else {
                    return fn(true, result);
                }
                
            });
        //});


    }); //end of hash

};
