var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.getMatch = function (req, params, fn) {

//    req.getConnection(function (err, connection) {
//
//        var if_search = '';
////        if (params.qsearch != '' && params.filter_by != '')
////            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
////        if (params.qsearch != '' && params.filter_by == '')
////            if_search += " AND username LIKE '%" + params.qsearch + "%' ";
//
//        var query = connection.query('SELECT * FROM `match` WHERE 1=1 ' + if_search + ' ORDER By match_id DESC LIMIT ?,?', [params.offset, params.limit], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            countAllMatch(req, params, function (total) {
//
//                //console.log("Total data : %d",total);
//                return fn(true, rows, total);
//            });
//
//
//        });
//
//        //console.log(query.sql);
//    });

    //Mongo query
    db.get().collection('match').find().skip(params.offset).limit(params.limit).toArray(
            function (err, rows) {
                if (err)
                    return fn(false, err);

                countAllMatch(req, params, function (total) {

                    console.log("Total data : %d", total);
                    console.log(rows);
                    return fn(true, rows, total);
                });

            });

};


function countAllMatch(req, params, fn) {

//    req.getConnection(function (err, connection) {
//
//        var if_search = '';
////        if(params.qsearch !='' && params.filter_by !='')
////            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
////        if(params.qsearch !='' && params.filter_by=='')
////            if_search +=" AND username LIKE '%"+params.qsearch+"%' ";
//
//        var query = connection.query('SELECT COUNT(match_id) as all_match FROM `match` WHERE 1=1 ' + if_search + ' ', function (err, rows)
//        {
//
//            if (err)
//                return fn(err);
//
//            return fn(rows[0].all_match);
//        });
//
//    });

    //Mongo query
    db.get().collection('match').count(
            function (err, count) {

                if (err)
                    return fn(err);

                return fn(count);
            });
}

/*------------------------------------------
 Adding Match
 -------------------------------------------*/
exports.save = function (req, res, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));


    //set password = temp.username
    //hash(temp.password, function(err, salt_it, hash_it){

//    //if (err) throw err;
//    console.log("save start");
//    if (!req.files) {
//        console.log('No files were uploaded.');
//        temp.image_name = '';
//    } else {
//        //console.log(req.files);
//        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
//        var sampleFile = req.files.image;
//        // Use the mv() method to place the file somewhere on your server 
//        var image_name = 'team_' + Date.now() + '.jpg';
//        sampleFile.mv('./public/uploads/' + image_name, function (err) {
//            if (err) {
//                console.log(err);
//                temp.image_name = '';
//            } else {
//                temp.image_name = image_name;
//            }
//        });
//    }
    //req.getConnection(function (err, connection) {

    //var datetime = dateFormat(temp.datetime, 'yyyy-mm-dd HH:MM:ss');
    if (temp.match_id == '') {

//        var insert = {
//            match_name: temp.match_name,
//            match_type: temp.match_type,
//            venue: temp.venue,
//            match_result: temp.match_result,
//            team_1: temp.team_1,
//            team_2: temp.team_2,
//            team_1_text: temp.team_1_text,
//            team_2_text: temp.team_2_text,
//            max_ball: temp.max_ball,
//            match_comment: temp.match_comment,
//            status: temp.status,
//            datetime: temp.datetime
//        };
//        connection.query("INSERT INTO `match` set ? ", insert, function (err, rows)
//        {
//            var state_data = {
//                match_id: rows.insertId,
//                team_name: "",
//                run: "0",
//                wicket: "0",
//                over: "0",
//                target: "0",
//                batsman_1: "",
//                batsman_1_run: "0",
//                batsman_1_ball: "0",
//                batsman_2: "",
//                batsman_2_run: "0",
//                batsman_2_ball: "0",
//                strick: "",
//                bowler: "",
//                message: ""
//            };
//            connection.query("INSERT INTO `states` set ? ", [state_data], function (err, rows) {
//
//            });
//
//            var session_data = {
//                match_key: rows.insertId,
//                market_rate_1: "0",
//                market_rate_2: "0",
//                favorite: "",
//                over: "0",
//                session_1: "0",
//                session_2: "0",
//                numbe_eleven: "0",
//            };
//            connection.query("INSERT INTO `session` set ? ", [session_data], function (err, rows) {
//
//            });
//
//            if (err)
//                return fn(false, err);
//
//            return fn(true, " New match created");
//
//        });

//console.log("============== team ids =============");
//console.log(temp.team_1);
//console.log(temp.team_2);

        var o_team_1_id = new ObjectID(temp.team_1);
        var o_team_2_id = new ObjectID(temp.team_2);
        var insert = {
            match_name: temp.match_name,
            unique_id: parseInt(temp.unique_id),
            match_type: temp.match_type,
            venue: temp.venue,
            match_result: temp.match_result,
            team_1: o_team_1_id,
            team_2: o_team_2_id,
            team_1_text: temp.team_1_text,
            team_2_text: temp.team_2_text,
            max_ball: temp.max_ball,
            match_comment: temp.match_comment,
            match_session: temp.match_session,
            status: temp.status,
            datetime: temp.datetime
        };
        //Mongo Query
        db.get().collection('match').save(insert, function (err, rows) {
            if (err)
                return fn(true, err);
//            console.log(rows);
            var match_id = rows.ops[0]._id;
//            console.log("================= match id =============");
//            console.log(match_id);

            //state insert
            var state_data = {
                match_id: match_id,
                team_name: "",
                run: "0",
                wicket: "0",
                over: "0",
                target: "0",
                batsman_1: "",
                batsman_1_run: "0",
                batsman_1_ball: "0",
                batsman_2: "",
                batsman_2_run: "0",
                batsman_2_ball: "0",
                strick: "",
                bowler: "",
                message: ""
            };
            //Mongo Query
            db.get().collection('states').save(state_data, function (err, result) {
                if (err)
                    console.log(err);
            });
            //session insert
            var session_data = {
                match_key: match_id,
                market_rate_1: "0",
                market_rate_2: "0",
                favorite: "",
                over: "0",
                session_1: "0",
                session_2: "0",
                numbe_eleven: "0",
                session_cal: "1"
            };
            //Mongo Query
            db.get().collection('session').save(session_data, function (err, result) {
                if (err)
                    console.log(err);
            });

            return fn(false, " New match created");
        });

    } else {

        var update;
        var o_id = new ObjectID(temp.match_id);
        var o_team_1_id = new ObjectID(temp.team_1);
        var o_team_2_id = new ObjectID(temp.team_2);
        update = {
            match_name: temp.match_name,
            unique_id: parseInt(temp.unique_id),
            match_type: temp.match_type,
            venue: temp.venue,
            match_result: temp.match_result,
            team_1: o_team_1_id,
            team_2: o_team_2_id,
            team_1_text: temp.team_1_text,
            team_2_text: temp.team_2_text,
            max_ball: temp.max_ball,
            match_comment: temp.match_comment,
            match_session: temp.match_session,
            status: temp.status,
            datetime: temp.datetime
        };
        //   }

//        connection.query("UPDATE `match` set ? WHERE match_id = ? ", [update, temp.match_id], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            return  fn(true, "Match Updated");
//
//
//
//        });
//Mongo Query
        db.get().collection('match').update({'_id': o_id}, {$set: update}, function (err, result) {
            if (err)
                return fn(true, err);

            return  fn(false, " Match Updated");
        });

    }
//    });

    // }); //end of hash

};

function insertMatch(insert, fn) {
    //Mongo Query
    db.get().collection('match').save(insert, function (err, result) {
        if (err)
            return fn(true, err);

        return fn(false, " New match created");
    });
}

function updateMatch(o_id, update, fn) {
    //Mongo Query
    db.get().collection('match').update({'_id': o_id}, {$set: update}, function (err, result) {
        if (err)
            return fn(true, err);

        return  fn(false, " Match Updated");
    });
}

exports.delete_match = function (req, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));
    var o_id = new ObjectID(req.params.id);
//    req.getConnection(function (err, connection) {
//
//        connection.query("DELETE FROM `match`  WHERE id = ? ", [temp.match_id], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            return fn(true, " Match deleted");
//
//        });
//
//    });
//Mongo Query
    db.get().collection('team').remove({'_id': o_id}, function (err, result) {
        if (err)
            return fn(false, err);
        return fn(true, result.result.n + " document(s) deleted");
    });
};

exports.getMessages = function () {
    var array = {
        'ball': "Ball",
        "0_run": "No Run",
        "1_run": "1 Run",
        "2_run": "2 Runs",
        "3_run": "3 Runs",
        "4_run": "4-Four-4",
        "5_run": "5 Runs",
        "6_run": "6-Six-6",
        "1_wicket": "Wicket",
        "inair": "Ball in the Air",
        "timeout": "Time Out!",
        "thirdumpire": "Third Umpire",
        // "bowlerhold" => "Bowler Ruka",
        "freehit": "Free Hit!",
        //  "catchout" => "Catch Out!",
        "catchdrop": "Catch Droped!",
        "notout": "Not Out",
//            "decisionpending"=>'Decision Pending',
        'over': 'Over',
        //  "ruko" => "Ruko Ruko Ruko",
    };
    return array;
}


exports.saveUpdateStates = function (data, match_id, fn) {
//    console.log("inside update states");
//    console.log(connection);
//    console.log(data);
//    console.log(match_id);

//            var query2 = connection.query("UPDATE `states` set ? WHERE match_id = ? ", [data, match_id], function (err, rows) {
//                // console.log(rows);
//                console.log("data updated");
//                // var query = connection.query('SELECT * FROM `match` as m LEFT JOIN `states` as s on `s`.`match_id` = `m`.`match_id` WHERE `m`.`status`="started" ORDER By `m`.`match_id` DESC', [], function (err, rows)
//                var query = connection.query('SELECT `s`.*,`m`.*,`ss`.`session_1`, `ss`.`session_2`, `ss`.`over` as session_over, `ss`.`numbe_eleven`, `ss`.`favorite` FROM `match` as m LEFT JOIN `states` as s on `s`.`match_id` = `m`.`match_id` LEFT JOIN `session` as `ss` ON `ss`.`match_key` = `m`.`match_id` WHERE `m`.`status`="started" ORDER By `m`.`match_id` DESC LIMIT 10', [], function (err, rows)
//                {
//                    if (err) {
//                        console.log(err);
//                    }
//                    console.log(rows);
//                    fn(rows);
//                    //return rows;
//                });
//                //setUpData(connection, match_id);
//            });

    //Mongo Query
    var o_id = new ObjectID(match_id);
    console.log("============= update states data ===============");
    console.log(data);
    db.get().collection('states').update({'match_id': o_id}, {$set: data}, function (err, result) {
        if (err)
            return fn(true, err);

        db.get().collection('match').aggregate([
            {"$match": {"status": 'started'}},
            {"$sort": {"match_id": -1}},
            {"$limit": 20},
            {"$lookup": {
                    "localField": "_id",
                    "from": "states",
                    "foreignField": "match_id",
                    "as": "states_info"
                }},
            {"$unwind": "$states_info"},
            {"$lookup": {
                    "localField": "_id",
                    "from": "session",
                    "foreignField": "match_key",
                    "as": "session_info"
                }},
            {"$unwind": "$session_info"},
        ]).toArray(
                function (err, rows) {
                    console.log(rows);
                    if (err) {
                        return fn(true, err);
                    }
                    else {
                        return fn(false, rows);
                    }
//            db.close();
                });
    });

    return true;
};

exports.saveUpdateSession = function (data, match_id, fn) {
//    console.log("inside update states");
//    console.log(connection);
//    console.log(data);
//    console.log(match_id);
//    var query = connection.query('SELECT COUNT(match_key) as matches FROM `session` WHERE `match_key` = ' + match_id + ' ', function (err, rows)
//    {
//        console.log(rows);
//        console.log(rows[0].matches);
//        console.log(rows["matches"]);
//        if (rows[0].matches > 0) {
//
//            var query2 = connection.query("UPDATE `session` set ? WHERE match_key = ? ", [data, match_id], function (err, rows) {
//                // console.log(rows);
//                console.log("data updated");
//                // var query = connection.query('SELECT `ss`.*,`m`.`match_name`,`m`.`match_id` FROM `session` as ss LEFT JOIN `states` as s on `s`.`match_id` = `ss`.`match_key` LEFT JOIN `match` as m on `m`.`match_id` = `ss`.`match_key` WHERE `m`.`status`="started" ORDER By `m`.`match_id` DESC', [], function (err, rows)
//                var query = connection.query('SELECT `s`.*,`m`.*,`ss`.`session_1`, `ss`.`session_2`, `ss`.`over` as session_over, `ss`.`numbe_eleven`, `ss`.`favorite` FROM `match` as m LEFT JOIN `states` as s on `s`.`match_id` = `m`.`match_id` LEFT JOIN `session` as `ss` ON `ss`.`match_key` = `m`.`match_id` WHERE `m`.`status`="started" ORDER By `m`.`match_id` DESC LIMIT 10', [], function (err, rows)
//                {
//                    if (err) {
//                        console.log(err);
//                    }
//                    console.log(rows);
//                    fn(rows);
//                    //return rows;
//                });
//                //setUpData(connection, match_id);
//            });
//            //return true;
//            //console.log(query2.sql);
//
//        } else {
//            //insert
////            insert = {
////                run: data["run"],
////                over: data["over"],
////                batsman_2_run: data["batsman_2_run"],
////                batsman_2_ball: data["batsman_2_ball"],
////                message: data["message"],
////                match_id: match_id
////            };
////            var nData = {};
////            for (key in data) {
////                console.log(data[key]);
////                //nData[key] = data[key];
////            }
//            var query2 = connection.query("INSERT INTO `session` set ? ", [data], function (err, rows) {
//                // console.log(rows);
//                //console.log("data inserted");
//                // var query = connection.query('SELECT `ss`.*,`m`.`match_name`,`m`.`match_id` FROM `session` as ss LEFT JOIN `states` as s on `s`.`match_id` = `ss`.`match_key` LEFT JOIN `match` as m on `m`.`match_id` = `ss`.`match_key` WHERE `m`.`status`="started" ORDER By `m`.`match_id` DESC', [], function (err, rows)
//                var query = connection.query('SELECT `s`.*,`m`.*,`ss`.`session_1`, `ss`.`session_2`, `ss`.`over` as session_over, `ss`.`numbe_eleven`, `ss`.`favorite` FROM `match` as m LEFT JOIN `states` as s on `s`.`match_id` = `m`.`match_id` LEFT JOIN `session` as `ss` ON `ss`.`match_key` = `m`.`match_id` WHERE `m`.`status`="started" ORDER By `m`.`match_id` DESC LIMIT 10', [], function (err, rows)
//                {
//                    if (err) {
//                        console.log(err);
//                    }
//                    // console.log(rows);
//                    fn(rows);
//                    //return rows;
//                });
//                //setUpData(connection, match_id);
//
//            });
//            //console.log(query2.sql);
//            //return true;
//        }
//    });

    //Mongo Query
    var o_id = new ObjectID(match_id);
    console.log("============= update session data ===============");
    console.log(data);
    db.get().collection('session').update({'match_key': o_id}, {$set: data}, function (err, result) {
        if (err)
            return fn(true, err);

        db.get().collection('match').aggregate([
            {"$match": {"status": 'started'}},
            {"$sort": {"match_id": -1}},
            {"$limit": 20},
            {"$lookup": {
                    "localField": "_id",
                    "from": "states",
                    "foreignField": "match_id",
                    "as": "states_info"
                }},
            {"$unwind": "$states_info"},
            {"$lookup": {
                    "localField": "_id",
                    "from": "session",
                    "foreignField": "match_key",
                    "as": "session_info"
                }},
            {"$unwind": "$session_info"},
        ]).toArray(
                function (err, rows) {
                    console.log(rows);
                    if (err) {
                        return fn(true, err);
                    }
                    else {
                        return fn(false, rows);
                    }
//            db.close();
                });
    });


}

exports.getMatchById = function (req, fn) {

    var o_id = new ObjectID(req.params.id);
//Mongo query
    db.get().collection('match').find({'_id': o_id}).toArray(
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

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
    return rv;
}

function setUpData(connection, match_id) {

    connection.query('SELECT * FROM `states` WHERE match_id = ?', [match_id], function (err, rows)
    {
        console.log("start------");
        console.log(rows);
        console.log("------end");
        //Message setup
        //$("#message_text").val(rows[0]["message"]);
//            document.getElementById("message_text").value = rows[0]["message"];
//            document.getElementById("run_text").value = rows[0]["run"];
//            $("#run_text").val(rows[0]["run"]);
//            $("#wicket_text").val(data.wicket);
//            $("#over_text").val(data.over);
//            $("#batsman_1_run_text").val(data.batsman_1_run);
//            $("#batsman_2_run_text").val(data.batsman_2_run);
//            $("#batsman_1_ball_text").val(data.batsman_1_ball);
//            $("#batsman_2_ball_text").val(data.batsman_2_ball);
//
//            var batsman_1_text = $("#batsman_1_text").val();
//            // alert(batsman_1_text);
//            if (batsman_1_text != "") {
//
//                $("#batsman_name_1").html(batsman_1_text);
//            }
//            var batsman_2_text = $("#batsman_2_text").val();
//            if (batsman_2_text != "") {
//                $("#batsman_name_2").html(batsman_2_text);
//            }
//
//            $('#ball_checkbox').attr('checked', false);
//            $('#message_select').prop('selectedIndex', 0);
//            $('#message_select2').prop('selectedIndex', 0);
//            $('#message_select3').prop('selectedIndex', 0);
        //Message setup ends
    });

}

exports.getMatchEditScoreById = function (req, fn) {

    var o_id = new ObjectID(req.params.id);
    console.log("============ getMatchEditScoreById =================");
    console.log(o_id);
//Mongo query
    //db.get().collection('match').find({'_id': o_id}).toArray(
    db.get().collection('match').aggregate([
        {"$match": {"_id": o_id}},
        {"$lookup": {
                "localField": "_id",
                "from": "states",
                "foreignField": "match_id",
                "as": "states_info"
            }},
        {"$unwind": "$states_info"},
        {"$lookup": {
                "localField": "team_1",
                "from": "team",
                "foreignField": "_id",
                "as": "team_1_info"
            }},
        {"$unwind": "$team_1_info"},
        {"$lookup": {
                "localField": "team_2",
                "from": "team",
                "foreignField": "_id",
                "as": "team_2_info"
            }},
        {"$unwind": "$team_2_info"},
    ]).toArray(
            function (err, rows) {
                console.log("=============matcheditcorebyid===============");
                console.log(rows);
                if (err) {
                    return fn(true, err);
                }
                else {
                    return fn(false, rows);
                }
//            db.close();
            });

}

exports.getMatchEditSessionById = function (req, fn) {

    var o_id = new ObjectID(req.params.id);
    console.log("============ getMatchEditSessionById =================");
    console.log(o_id);
//Mongo query
    //db.get().collection('match').find({'_id': o_id}).toArray(
    db.get().collection('match').aggregate([
        {"$match": {"_id": o_id}},
        {"$lookup": {
                "localField": "_id",
                "from": "session",
                "foreignField": "match_key",
                "as": "session_info"
            }},
        {"$unwind": "$session_info"},
        {"$lookup": {
                "localField": "team_1",
                "from": "team",
                "foreignField": "_id",
                "as": "team_1_info"
            }},
        {"$unwind": "$team_1_info"},
        {"$lookup": {
                "localField": "team_2",
                "from": "team",
                "foreignField": "_id",
                "as": "team_2_info"
            }},
        {"$unwind": "$team_2_info"},
    ]).toArray(
            function (err, rows) {
                console.log("=============matcheditcorebyid===============");
                console.log(rows);
                if (err) {
                    return fn(true, err);
                }
                else {
                    return fn(false, rows);
                }
//            db.close();
            });

}

exports.getMatchListAPI = function (params, fn) {
    var status = params.status;
    if (status == 'started' || status == 'notstarted') {
        var order = 1; //ASC
    } else {
        var order = -1; //DESC
    }
    db.get().collection('match').aggregate([
        {"$match": {"status": status}},
        {$limit: 20},
        {$sort: {datetime: order}},
//            {"$lookup": {
//                    "localField": "_id",
//                    "from": "states",
//                    "foreignField": "match_id",
//                    "as": "states_info"
//                }},
//            {"$unwind": "$states_info"},
        {"$lookup": {
                "localField": "team_1",
                "from": "team",
                "foreignField": "_id",
                "as": "team_1_info"
            }},
        {"$unwind": "$team_1_info"},
        {"$lookup": {
                "localField": "team_2",
                "from": "team",
                "foreignField": "_id",
                "as": "team_2_info"
            }},
        {"$unwind": "$team_2_info"},
//        {"$lookup": {
//                "localField": "unique_id",
//                "from": "cricapi_matches",
//                "foreignField": "unique_id",
//                "as": "cricapi_info"
//            }},
//        {"$unwind":
//                    {
//                        path: "$cricapi_info",
//                        preserveNullAndEmptyArrays: true
//                    }
//        },
    ]).toArray(
            function (err, rows) {
//                console.log("=============matcheditcorebyid===============");
//                console.log(rows);
                if (err) {
                    return fn(true, err);
                }
                else {
                    return fn(false, rows);
                }
//            db.close();
            });
    //});

};



exports.delete_match = function (req, fn) {

    var o_id = new ObjectID(req.params.id);

//Mongo Query
    db.get().collection('match').remove({'_id': o_id}, function (err, result) {
        if (err)
            return fn(false, err);

        db.get().collection('states').remove({'match_id': o_id}, function (err, result2) {
            db.get().collection('session').remove({'match_key': o_id}, function (err, result3) {
                return fn(true, result.result.n + " matchs + " + result2.result.n + " states + " + result3.result.n + " session document(s) deleted");
            });
        });


    });
};
