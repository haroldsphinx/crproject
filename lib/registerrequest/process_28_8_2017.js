exports.getRegisterRequest = function (req, params, fn) {

    req.getConnection(function (err, connection) {

        var if_search = '';
        if (params.qsearch != '' && params.filter_by != '')
            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
        if (params.qsearch != '' && params.filter_by == '')
            if_search += " AND username LIKE '%" + params.qsearch + "%' ";

        var query = connection.query('SELECT * FROM register_request WHERE 1=1 ' + if_search + ' ORDER BY `register_request_id` DESC LIMIT ?,?', [params.offset, params.limit], function (err, rows)
        {

            if (err)
                return fn(false, err);

            countAllRegisterReqest(req, params, function (total) {

                //console.log("Total data : %d",total);
                return fn(true, rows, total);
            });


        });

        console.log(query.sql);
    });

};


function countAllRegisterReqest(req, params, fn) {

    req.getConnection(function (err, connection) {

        var if_search = '';
        if (params.qsearch != '' && params.filter_by != '')
            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
        if (params.qsearch != '' && params.filter_by == '')
            if_search += " AND username LIKE '%" + params.qsearch + "%' ";

        var query = connection.query('SELECT COUNT(*) as all_user FROM register_request WHERE 1=1 ' + if_search + ' ', function (err, rows)
        {

            if (err)
                return fn(err);

            return fn(rows[0].all_user);
        });

    });
}

/*------------------------------------------
 Adding register_request
 Need to include hash
 -------------------------------------------*/
exports.save = function (req, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));


        req.getConnection(function (err, connection) {

                var insert = {
                    name: temp.name,
                    email: temp.email,
                    phone: temp.phone,
                    password: temp.password,
                    message: temp.message,
                };
                connection.query("INSERT INTO register_request set ? ", insert, function (err, rows)
                {

                    if (err)
                        return fn(false, err);

                    return fn(true, " New request created");

                });
        });

};

exports.delete_register_request = function (req, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM register_request  WHERE id = ? ", [temp.register_request_id], function (err, rows)
        {

            if (err)
                return fn(false, err);

            return fn(true, "register request deleted");

        });

    });
};

