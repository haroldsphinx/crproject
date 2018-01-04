var ObjectID = require('mongodb').ObjectID;
var db = require('../db');


exports.getAllClientsCounts = function (req, fn) {

   db.get().collection('clients').count({}, function (err, count) {
                        if (err)
                            return fn(false, err);
                   
                        return fn(true, count);
                    });
};

exports.getClients = function (req, params, fn) {

    db.get().collection('clients').find().skip(params.offset).limit(params.limit).project({device_id: 1, _id: 0}).toArray(function (err, result) {
        console.log("====== device tokens =====");
        console.log(result.length);
        console.log("====== device tokens end=====");
        var total = result.length;
        var device_ids = [];
        for(var i=0; i<total; i++){
            //result[i]["device_id"];
            console.log(result[i]["device_id"]);
            device_ids.push(result[i]["device_id"]);
        }
        fn(req, device_ids);
    });
};

//exports.getClientsData = function (req, fn) {
//
//    db.get().collection('clients').count({}, function (err, count) {
//        if (err)
//            return fn(err);
//        data.all_clients = count;
//        db.get().collection('clients').count({'status': 'online'}, function (err, count) {
//            if (err)
//                return fn(err);
//            data.online_clients = count;
//            db.get().collection('clients').count({'status': 'online', 'device_type': 'Ios'}, function (err, count) {
//                if (err)
//                    return fn(err);
//                data.online_ios = count;
//                db.get().collection('clients').count({'status': 'online', 'device_type': 'Android'}, function (err, count) {
//                    if (err)
//                        return fn(err);
//                    data.online_android = count;
//                    db.get().collection('clients').count({'status': 'online', 'device_type': 'desktop'}, function (err, count) {
//                        if (err)
//                            return fn(err);
//                        data.online_desktop = count;
//                        return fn(true, data);
//                    });
//                });
//            });
//        });
//    });
//}
