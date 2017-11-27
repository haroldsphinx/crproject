var ObjectID = require('mongodb').ObjectID;
var db = require('../db');
////exports.getRegisterRequest = function (req, params, fn) {
//
//    req.getConnection(function (err, connection) {
//
//        var if_search = '';
//        if (params.qsearch != '' && params.filter_by != '')
//            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
//        if (params.qsearch != '' && params.filter_by == '')
//            if_search += " AND username LIKE '%" + params.qsearch + "%' ";
//
//        var query = connection.query('SELECT * FROM register_request WHERE 1=1 ' + if_search + ' LIMIT ?,?', [params.offset, params.limit], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            countAllRegisterReqest(req, params, function (total) {
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
//
//};

//
//function countAllRegisterReqest(req, params, fn) {
//
//    req.getConnection(function (err, connection) {
//
//        var if_search = '';
//        if (params.qsearch != '' && params.filter_by != '')
//            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
//        if (params.qsearch != '' && params.filter_by == '')
//            if_search += " AND username LIKE '%" + params.qsearch + "%' ";
//
//        var query = connection.query('SELECT COUNT(id) as all_user FROM register_request WHERE 1=1 ' + if_search + ' ', function (err, rows)
//        {
//
//            if (err)
//                return fn(err);
//
//            return fn(rows[0].all_user);
//        });
//
//    });
//}

/*------------------------------------------
 Adding register_request
 Need to include hash
 -------------------------------------------*/
exports.saveUpdateClients = function (data, device_id, fn) {
    //console.log("inside update states");
    //  console.log(connection);
//    console.log(data);
//    console.log(device_id);
//    var query = connection.query('SELECT COUNT(clients_id) as count FROM `clients` WHERE `device_id` = "' + device_id + '" ', function (err, rows)
//    {
//        console.log("--rows--");
//        console.log(rows);
//        //console.log(rows["id"]);
//        if (rows[0].count) {
//            //update
//            var query2 = connection.query("UPDATE `clients` set ? WHERE `device_id` = ? ", [data, device_id], function (err, rows) {
//                // console.log(rows);
//                if (err)
//                    return fn(false, err);
//
//                fn(true, "data updated");
//            });
//        } else {
//            //insert
//            var query2 = connection.query("INSERT INTO `clients` set ? ", [data], function (err, rows) {
//                // console.log(rows);
//                if (err)
//                    return fn(false, err);
//
//                fn(true, "data inserted");
//            });
//
//
//        }
//    });

    db.get().collection('clients').find({'device_id': device_id}).toArray(function (err, clients) {
        if (err)
            return fn(false, err);
        if (clients.length > 0) {
            //update
            db.get().collection('clients').update({'device_id': device_id}, {$set: data}, function (err, result) {
                if (err)
                    return fn(false, err);

                return fn(true, "data updated");
            });
        } else {
            //insert 
            db.get().collection('clients').save(data, function (err, result) {
                if (err)
                    return fn(false, err);

                return fn(true, "data inserted");
            });
        }
    });
}

exports.updateClientsStatus = function (data, websocket_key, fn) {

//    var query2 = connection.query("UPDATE `clients` set ? WHERE `websocket_key` = ? ", [data, websocket_key], function (err, rows) {
//        // console.log(rows);
//        if (err)
//            return fn(false, err);
//
//        fn(true, "status updated");
//    });

    db.get().collection('clients').update({'websocket_key': websocket_key}, {$set: data}, function (err, result) {
        if (err)
            return fn(false, err);

        return fn(true, "status updated");
    });
}

exports.getClientsData = function (req, fn) {

//    req.getConnection(function (err, connection) {
    var data = {
        all_clients: 0,
        online_clients: 0,
        online_ios: 0,
        online_android: 0,
        online_desktop: 0,
    };
//        var query = connection.query('SELECT COUNT(clients_id) as all_clients FROM clients WHERE 1=1', function (err, rows)
//        {
//
//            if (err)
//                return fn(err);
//            data.all_clients = rows[0].all_clients;
//
//            connection.query('SELECT COUNT(clients_id) as online_clients FROM clients WHERE `status`= "online"', function (err, rows)
//            {
//                data.online_clients = rows[0].online_clients;
//                connection.query('SELECT COUNT(clients_id) as online_ios FROM clients WHERE `status`= "online" and `device_type`= "Ios"', function (err, rows)
//                {
//                    data.online_ios = rows[0].online_ios;
//                    connection.query('SELECT COUNT(clients_id) as online_android FROM clients WHERE `status`= "online" and `device_type`= "Android"', function (err, rows)
//                    {
//                        data.online_android = rows[0].online_android;
//                        connection.query('SELECT COUNT(clients_id) as online_desktop FROM clients WHERE `status`= "online" and `device_type`= "desktop"', function (err, rows)
//                        {
//                            data.online_desktop = rows[0].online_desktop;
//                            return fn(true, data);
//                        });
//                    });
//                });
//            });
//
//        });

    //});
    db.get().collection('clients').count({}, function (err, count) {
        if (err)
            return fn(err);
        data.all_clients = count;
        db.get().collection('clients').count({'status': 'online'}, function (err, count) {
            if (err)
                return fn(err);
            data.online_clients = count;
            db.get().collection('clients').count({'status': 'online', 'device_type': 'Ios'}, function (err, count) {
                if (err)
                    return fn(err);
                data.online_ios = count;
                db.get().collection('clients').count({'status': 'online', 'device_type': 'Android'}, function (err, count) {
                    if (err)
                        return fn(err);
                    data.online_android = count;
                    db.get().collection('clients').count({'status': 'online', 'device_type': 'desktop'}, function (err, count) {
                        if (err)
                            return fn(err);
                        data.online_desktop = count;
                        return fn(true, data);
                    });
                });
            });
        });
    });
}
//exports.save = function (req, fn) {
//
//    var temp = JSON.parse(JSON.stringify(req.body));
//
//
//        req.getConnection(function (err, connection) {
//
//                var insert = {
//                    name: temp.name,
//                    email: temp.email,
//                    phone: temp.phone,
//                };
//                connection.query("INSERT INTO register_request set ? ", insert, function (err, rows)
//                {
//
//                    if (err)
//                        return fn(false, err);
//
//                    return fn(true, " New request created");
//
//                });
//        });
//
//};

//exports.delete_register_request = function (req, fn) {
//
//    var temp = JSON.parse(JSON.stringify(req.body));
//
//    req.getConnection(function (err, connection) {
//
//        connection.query("DELETE FROM register_request  WHERE id = ? ", [temp.register_request_id], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            return fn(true, "register request deleted");
//
//        });
//
//    });
//};

