exports.getUser = function (req, params, fn) {

    req.getConnection(function (err, connection) {

        var if_search = '';
        if (params.qsearch != '' && params.filter_by != '')
            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
        if (params.qsearch != '' && params.filter_by == '')
            if_search += " AND username LIKE '%" + params.qsearch + "%' ";

        var query = connection.query('SELECT * FROM user WHERE 1=1 ' + if_search + ' ORDER By `id` DESC LIMIT ?,?', [params.offset, params.limit], function (err, rows)
        {

            if (err)
                return fn(false, err);

            countAllUser(req, params, function (total) {

                //console.log("Total data : %d",total);
                return fn(true, rows, total);
            });


        });

        console.log(query.sql);
    });

};


function countAllUser(req, params, fn) {

    req.getConnection(function (err, connection) {

        var if_search = '';
        if (params.qsearch != '' && params.filter_by != '')
            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
        if (params.qsearch != '' && params.filter_by == '')
            if_search += " AND username LIKE '%" + params.qsearch + "%' ";

        var query = connection.query('SELECT COUNT(id) as all_user FROM user WHERE 1=1 ' + if_search + ' ', function (err, rows)
        {

            if (err)
                return fn(err);

            return fn(rows[0].all_user);
        });

    });
}

/*------------------------------------------
 Adding users
 Need to include hash
 -------------------------------------------*/
exports.save = function (req, hash, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));


    //set password = temp.username
    hash(temp.password, function (err, salt_it, hash_it) {

        if (err)
            throw err;

        req.getConnection(function (err, connection) {


            if (temp.user_id == '') {

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
                connection.query("INSERT INTO user set ? ", insert, function (err, rows)
                {

                    if (err)
                        return fn(false, err);

                    return fn(true, " New user created");

                });

            } else {

                var update;
                if (temp.password != '') { //if password is filled

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

                } else {

                    update = {
                        username: temp.username,
                        type_of_membership: temp.type_of_membership,
                        startdate: temp.startdate,
                        enddate: temp.enddate,
                        amount: temp.amount,
                        logged_in: temp.logged_in,
                        status: temp.status
                    };
                }
                connection.query("UPDATE user set ? WHERE id = ? ", [update, temp.user_id], function (err, rows)
                {

                    if (err)
                        return fn(false, err);

                    return  fn(true, " user Updated");



                });

            }
        });

    }); //end of hash

};

exports.delete_user = function (req, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM user  WHERE id = ? ", [temp.user_id], function (err, rows)
        {

            if (err)
                return fn(false, err);

            return fn(true, " user deleted");

        });

    });
};


exports.getUserProfile = function (req, fn) {

    req.getConnection(function (err, connection) {
        var id = req.body.id;
        var query = connection.query('SELECT id,username,type_of_membership,device_id,device_type FROM user WHERE id = ? LIMIT 1', [id], function (err, rows)
        {

            if (err)
                return fn(false, err);
            //console.log("Total data : %d",total);
            return fn(true, rows);

        });

        //console.log(query.sql);
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

