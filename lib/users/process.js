var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.getUser = function (req, params, fn) {

//    req.getConnection(function (err, connection) {
//
//        var if_search = '';
//        if (params.qsearch != '' && params.filter_by != '')
//            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
//        if (params.qsearch != '' && params.filter_by == '')
//            if_search += " AND username LIKE '%" + params.qsearch + "%' ";
//
//        var query = connection.query('SELECT * FROM user WHERE 1=1 ' + if_search + ' ORDER By `id` DESC LIMIT ?,?', [params.offset, params.limit], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            countAllUser(req, params, function (total) {
//
//                //console.log("Total data : %d",total);
//                return fn(true, rows, total);
//            });
//
//
//        });
//
//        console.log(query.sql);
//    });

    //Mongo query
//    MongoClient.connect(globals.db_url, function (err, db) {
//        if (err)
//            return console.log(err);
    db.get().collection('user').find().skip(params.offset).limit(params.limit).toArray(
            function (err, rows) {
                if (err)
                    return fn(false, err);

                countAllUser(req, params, function (total) {

                    console.log("Total data : %d", total);
                    console.log(rows);
                    return fn(true, rows, total);
                });

            });
    //});

};


function countAllUser(req, params, fn) {

//    req.getConnection(function (err, connection) {
//
//        var if_search = '';
//        if (params.qsearch != '' && params.filter_by != '')
//            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
//        if (params.qsearch != '' && params.filter_by == '')
//            if_search += " AND username LIKE '%" + params.qsearch + "%' ";
//
//        var query = connection.query('SELECT COUNT(id) as all_user FROM user WHERE 1=1 ' + if_search + ' ', function (err, rows)
//        {
//
//            if (err)
//                return fn(err);
//
//            return fn(rows[0].all_user);
//        });
//
//    });

    //Mongo query
//    MongoClient.connect(globals.db_url, function (err, db) {
//        if (err)
//            return console.log(err);
    db.get().collection('user').count(
            function (err, count) {

                if (err)
                    return fn(err);

                return fn(count);
            });
    // });
}

/*------------------------------------------
 Adding users
 Need to include hash
 -------------------------------------------*/
exports.save = function (req, hash, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));

    console.log(temp);
    //console.log("got in insert 1");
    //set password = temp.username
    hash(temp.password, function (err, salt_it, hash_it) {
        //console.log("got in insert 2");
        if (err)
            throw err;
        //console.log("got in insert 3");
//        req.getConnection(function (err, connection) {
//
//            console.log("got in insert 4");
//            if (temp.user_id == '' || !(temp.user_id)) {
//
//                console.log("got in insert");
//                var query = connection.query('SELECT COUNT(id) as id FROM `user` WHERE `username` = "' + temp.username + '" ', function (err, rows)
//                {
//                    console.log("got in insert 5");
//                    console.log(rows);
//                    console.log(rows[0].id);
//                    console.log(rows["id"]);
//                    if (rows[0].id <= 0) {
//                        var insert = {
//                            username: temp.username,
//                            password_salt: salt_it,
//                            password_hash: hash_it,
//                            type_of_membership: temp.type_of_membership,
//                            startdate: temp.startdate,
//                            enddate: temp.enddate,
//                            amount: temp.amount,
//                            status: temp.status
//                        };
//                        connection.query("INSERT INTO user set ? ", insert, function (err, rows)
//                        {
//
//                            if (err)
//                                return fn(false, err);
//
//                            return fn(true, " New user created");
//
//                        });
//                    } else {
//                        console.log("Opps! User already Exist!");
//                        fn(false, "Opps! User already Exist!");
//                    }
//                });
//                console.log(query.sql);
//            } else {
//
//                var update;
//                if (temp.password != '') { //if password is filled
//
//                    update = {
//                        username: temp.username,
//                        password_salt: salt_it,
//                        password_hash: hash_it,
//                        type_of_membership: temp.type_of_membership,
//                        startdate: temp.startdate,
//                        enddate: temp.enddate,
//                        amount: temp.amount,
//                        logged_in: temp.logged_in,
//                        status: temp.status
//                    };
//
//                } else {
//
//                    update = {
//                        username: temp.username,
//                        type_of_membership: temp.type_of_membership,
//                        startdate: temp.startdate,
//                        enddate: temp.enddate,
//                        amount: temp.amount,
//                        logged_in: temp.logged_in,
//                        status: temp.status
//                    };
//                }
//                connection.query("UPDATE user set ? WHERE id = ? ", [update, temp.user_id], function (err, rows)
//                {
//
//                    if (err)
//                        return fn(false, err);
//
//                    return  fn(true, " user Updated");
//
//
//
//                });
//
//            }
//        });

        //Mongo query
        if (temp.user_id == '' || !(temp.user_id)) {

            db.get().collection('user').find({'username': temp.username}).toArray(function (err, user) {
                console.log(user);
                if (user.length > 0) {
                    console.log("Opps! User already Exist!");
                    fn(false, "Opps! User already Exist!");
                } else {
                    var insert = {
                        username: temp.username,
                        password_salt: salt_it,
                        password_hash: hash_it,
                        type_of_membership: temp.type_of_membership,
                        startdate: temp.startdate,
                        enddate: temp.enddate,
                        amount: temp.amount,
                        status: temp.status
                    };
                    db.get().collection('user').save(insert, function (err, result) {
                        if (err)
                            return fn(false, err);

                        return fn(true, " New user created");
                    });
                }
            })
        } else {

            var update;
            var o_id = new ObjectID(temp.user_id);
//            console.log("----Temp-----");
//            console.log(temp);
            if(temp.password == '' || !(temp.password)){
                update = {
                    username: temp.username,
                    type_of_membership: temp.type_of_membership,
                    startdate: temp.startdate,
                    enddate: temp.enddate,
                    amount: temp.amount,
                    logged_in: temp.logged_in,
                    status: temp.status
                };
            }else{
                update = {
                    username: temp.username,
                    password_salt: salt_it,
                    password_hash: hash_it,
                    type_of_membership: temp.type_of_membership,
                    startdate: temp.startdate,
                    enddate: temp.enddate,
                    amount: temp.amount,
                    logged_in: temp.logged_in,
                    status: temp.status
                };
            }
            
            db.get().collection('user').update({'_id': o_id}, {$set:update}, function (err, result) {
                if (err)
                    return fn(false, err);

                return  fn(true, " user Updated");
            });

        }


    }); //end of hash

};

exports.delete_user = function (req, fn) {

    //var temp = JSON.parse(JSON.stringify(req.body));
    var o_id = new ObjectID(req.params.id);
//    req.getConnection(function (err, connection) {
//
//        connection.query("DELETE FROM user  WHERE id = ? ", [temp.user_id], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            return fn(true, " user deleted");
//
//        });
//
//    });
//Mongo Query
    db.get().collection('user').remove({'_id': o_id}, function (err, result) {
        if (err)
            return fn(false, err);
        return fn(true, result.result.n + " document(s) deleted");
    });

};


exports.getUserProfile = function (req, fn) {

    var o_id = new ObjectID(req.params.id);
//console.log(o_id);
//    req.getConnection(function (err, connection) {
//        var id = req.body.id;
//        var query = connection.query('SELECT id,username,type_of_membership,device_id,device_type FROM user WHERE id = ? LIMIT 1', [id], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//            //console.log("Total data : %d",total);
//            return fn(true, rows);
//
//        });
//
//        //console.log(query.sql);
//    });

//Mongo query
    db.get().collection('user').find({'_id': o_id}).toArray(
            function (err, rows) {
                if (err) {
                    return fn(false, err);
                }
                else {
                    return fn(true, rows);
                }
//            db.close();
            });

}

exports.changepassword = function (req, hash, fn) {

    /*----------------------------------------------
     Set it in Global like this,so it can be accessed
     inside the callback function below
     ------------------------------------------------*/
//    var users = {
//        tj: {username: 'admin'}  // set username
//    };

    //set password = admin123
    var password = req.body.password
    var id = req.body.id
    hash(password, function (err, salt, hash) {

        if (err)
            throw err;


//        users.tj.salt = salt;
//        users.tj.hash = hash;

        /*Seeding db*/
        req.getConnection(function (err, connection) {

            update = {
                password_salt: salt,
                password_hash: hash,
            };
            connection.query("UPDATE user set ? WHERE id = ? ", [update, id], function (err, rows)
            {

                if (err)
                    return fn(false, err);

                return  fn(true, " user Updated");



            });

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
        });

    }); //end of hash

};

