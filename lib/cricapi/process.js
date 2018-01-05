var ObjectID = require('mongodb').ObjectID;
var globals = require('../globals'); //<< globals.js path
var db = require('../db');
var wget = require("request");
var apikey = globals.apikey;
var table = 'cricapi_matches';
exports.cricketMatches = function (callback) {
    wget.post({
        url: "http://cricapi.com/api/cricket/",
        form: {apikey: apikey}
    }, function (err, resp, body) {
        callback(body);
    });
};

exports.cricketScores = function (unique_id, callback) {
    wget.post({
        url: "http://cricapi.com/api/cricketScore/",
        form: {unique_id: unique_id, apikey: apikey}
    }, function (err, resp, body) {
        callback(body);
    });
}

exports.ballByBall = function (unique_id, callback) {
    wget.post({
        url: "http://cricapi.com/api/ballByBall/",
        form: {unique_id: unique_id, apikey: apikey}
    }, function (err, resp, body) {
        callback(body);
    });
}

exports.playerStats = function (pid, callback) {
    wget.post({
        url: "http://cricapi.com/api/playerStats/",
        form: {pid: pid, apikey: apikey}
    }, function (err, resp, body) {
        callback(body);
    });
}

exports.fantasyApi = function (unique_id, callback) {
    wget.post({
        url: "http://cricapi.com/api/fantasySummary/",
        form: {unique_id: unique_id, apikey: apikey}
    }, function (err, resp, body) {
//        console.log("-----error----");
//        console.log(err);
//        console.log("-----resp----");
//        console.log(resp);
        callback(body);
    });
}

exports.saveCricketMatches_old = function (fn) {
    wget.post({
        url: "http://cricapi.com/api/cricket/",
        form: {apikey: apikey}
    }, function (err, resp, body) {
//        callback(body);
        var matches = JSON.parse(body).data;
        var data_inserted = 0;
        var data_updated = 0;
//        matches.forEach(function (match) {
//            wget.post({
//                url: "http://cricapi.com/api/fantasySummary/",
//                form: {unique_id: match.unique_id, apikey: apikey}
//            }, function (err, resp, body) {
////        console.log("-----error----");
////        console.log(err);
////        console.log("-----resp----");
////        console.log(resp);
//                //callback(body);
//                var bbb = JSON.parse(body, null, 2);
//                db.get().collection(table).find({'unique_id': match.unique_id}).toArray(function (err, matches) {
//                   // console.log(matches);
//                    if (matches.length > 0) {
//                        //Update
//                        update = {
//                            'title': match.title,
//                            'description': match.description,
//                            'fantasySummary': bbb
//                        };
//                        db.get().collection(table).update({'unique_id': match.unique_id}, {$set: update}, function (err, result) {
//                            if (err)
//                               console.log(err);
//                           data_updated++;
//                          console.log("data updated - "+ data_updated);
//                                
//                        });
//
//                    } else {
//                        //Insert
//                        var insert = {
//                            'unique_id': match.unique_id,
//                            'title': match.title,
//                            'description': match.description,
//                            'fantasySummary': bbb
//                        };
//                        db.get().collection(table).save(insert, function (err, result) {
//                            if (err)
//                                console.log(err);
//                            data_inserted++;
//                            console.log("data inserted - "+ data_inserted);
//                        });
//
//                    }
//                    
//                    
//                });
//            });
//        })
    });
    fn(true);
};

exports.saveCricketMatches = function (fn) {
    wget.get({
        url: "http://cricapi.com/api/matches/",
        form: {apikey: apikey}
    }, function (err, resp, body) {
        console.log("============ matches api ===============");
        console.log(body);
        console.log("============ matches api END===============");
//        callback(body);
        var matches = JSON.parse(body).matches;
        var data_inserted = 0;
        var data_updated = 0;
        var data_count = 0;
        matches.forEach(function (match) {
            data_count++;
            console.log("data_count->" + data_count);
            var team_1 = match['team-1'];
            var team_2 = match['team-2'];
            var unique_id = match.unique_id;
            var type = match.type;
            var ndate = match.date;
            var dateTimeGMT = match.dateTimeGMT;
            var squad = match.squad;
            var toss_winner_team = match.toss_winner_team;
            var winner_team = match.winner_team;
            var matchStarted = match.matchStarted;
            console.log(team_1);
            console.log(team_2);
            console.log(unique_id);
            console.log(toss_winner_team);
            console.log(winner_team);
            db.get().collection(table).find({'unique_id': unique_id}).toArray(function (err, matches) {

                if (matches.length > 0) {
                    console.log("========== match data =============");
                    console.log(match);
                    console.log("========== match data END =============");


                    //Update
                    if (matchStarted == true) {
                        wget.post({
                            url: "http://cricapi.com/api/fantasySummary/",
                            form: {unique_id: unique_id, apikey: apikey}
                        }, function (err, resp, body) {
                            var bbb = JSON.parse(body, null, 2);
                            wget.post({
                                url: "http://cricapi.com/api/cricketScore/",
                                form: {unique_id: unique_id, apikey: apikey}
                            }, function (err, resp, body2) {

                                var bbb2 = JSON.parse(body2, null, 2);
                                // db.get().collection(table).find({'unique_id': match.unique_id}).toArray(function (err, matches) {
                                // console.log(matches);
                                //  if (matches.length > 0) {
                                //Update
                                update = {
                                    'team_1': team_1,
                                    'team_2': team_2,
                                    'type': type,
                                    'date': ndate,
                                    'dateTimeGMT': dateTimeGMT,
                                    'squad': squad,
                                    'toss_winner_team': toss_winner_team,
                                    'winner_team': winner_team,
                                    'matchStarted': matchStarted,
                                    'fantasySummary': bbb,
                                    'cricketScore': bbb2
                                };
                                db.get().collection(table).update({'unique_id': unique_id}, {$set: update}, function (err, result) {
                                    if (err)
                                        console.log(err);
                                    data_updated++;
                                    console.log("data updated with fantacy - " + data_updated);

                                });
                            });
                        });
                    } else {
                        update = {
                            'team_1': team_1,
                            'team_2': team_2,
                            'type': type,
                            'date': ndate,
                            'dateTimeGMT': dateTimeGMT,
                            'squad': squad,
                            'toss_winner_team': toss_winner_team,
                            'winner_team': winner_team,
                            'matchStarted': matchStarted,
                            'fantasySummary': '',
                            'cricketScore': ''
                        };
                        db.get().collection(table).update({'unique_id': unique_id}, {$set: update}, function (err, result) {
                            if (err)
                                console.log(err);
                            data_updated++;
                            console.log("data updated - " + data_updated);

                        });
                    }

                } else {
                    //Insert
                    if (matchStarted == true) {
                        wget.post({
                            url: "http://cricapi.com/api/fantasySummary/",
                            form: {unique_id: unique_id, apikey: apikey}
                        }, function (err, resp, body) {
                            var bbb = JSON.parse(body, null, 2);
                            wget.post({
                                url: "http://cricapi.com/api/cricketScore/",
                                form: {unique_id: unique_id, apikey: apikey}
                            }, function (err, resp, body2) {

                                var bbb2 = JSON.parse(body2, null, 2);
                                //Update
                                insert = {
                                    'unique_id': unique_id,
                                    'team_1': team_1,
                                    'team_2': team_2,
                                    'type': type,
                                    'date': ndate,
                                    'dateTimeGMT': dateTimeGMT,
                                    'squad': squad,
                                    'toss_winner_team': toss_winner_team,
                                    'winner_team': winner_team,
                                    'matchStarted': matchStarted,
                                    'fantasySummary': bbb,
                                    'cricketScore': bbb2
                                };
                                db.get().collection(table).save(insert, function (err, result) {
                                    if (err)
                                        console.log(err);
                                    data_inserted++;
                                    console.log("data inserted with fantacy - " + unique_id + " - " + data_inserted);
                                });
                            });
                        });
                    } else {
                        insert = {
                            'unique_id': unique_id,
                            'team_1': team_1,
                            'team_2': team_2,
                            'type': type,
                            'date': ndate,
                            'dateTimeGMT': dateTimeGMT,
                            'squad': squad,
                            'toss_winner_team': toss_winner_team,
                            'winner_team': winner_team,
                            'matchStarted': matchStarted,
                            'fantasySummary': '',
                            'cricketScore': ''
                        };
                        console.log("========== insert =============");
                        console.log(insert);
                        db.get().collection(table).save(insert, function (err, result) {
                            if (err)
                                console.log(err);
                            data_inserted++;
                            console.log("data inserted - " + data_inserted);
                        });
                    }
                }
            });
        }) //For each loop end
    });
    fn(true);
};

exports.getCrickapiMatches = function (req, params, fn) {
    //Mongo query
    if (params.sort_by) {
        var sb = (params.sort_by).toString();
    } else {
        var sb = "dateTimeGMT";//"_id";
    }
    console.log("sort order->" + params.sort_ord)
    if (params.sort_ord == 1 || params.sort_ord == -1) {
        var so = params.sort_ord;
    } else {
        var so = -1;
    }
    //var sorted = {'team_1': -1};
    console.log("stopred->" + sb);
    console.log("sort ord->" + so);
    var str = '{"' + sb + '": ' + so + '}';//"{" + sb + ":" + so + "}";
    var sorted = JSON.parse(str);

    console.log(sorted);
    console.log("sort by->" + sb);
    console.log("sort order->" + so)
    db.get().collection(table).find({"type": {$in: ["Twenty20", "T20I", "ODI"]}}).skip(params.offset).limit(params.limit).sort(sorted).toArray(
            function (err, rows) {
                if (err)
                    return fn(false, err);

                countAllCrickapiMatches(req, params, function (total) {

                    console.log("Total data : %d", total);
                    console.log(rows);
                    return fn(true, rows, total);
                });

            });
};


function countAllCrickapiMatches(req, params, fn) {

//    req.getConnection(function (err, connection) {
//
//        var if_search = '';
////        if(params.qsearch !='' && params.filter_by !='')
////            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
////        if(params.qsearch !='' && params.filter_by=='')
////            if_search +=" AND username LIKE '%"+params.qsearch+"%' ";
//
//        var query = connection.query('SELECT COUNT(team_id) as all_team FROM team WHERE 1=1 ' + if_search + ' ', function (err, rows)
//        {
//
//            if (err)
//                return fn(err);
//
//            return fn(rows[0].all_team);
//        });
//
//    });

    //Mongo query
    db.get().collection(table).find({"type": {$in: ["Twenty20", "T20I", "ODI"]}}).count(
            function (err, count) {

                if (err)
                    return fn(err);

                return fn(count);
            });
}

exports.removeCricapi = function (req, fn) {
    var delete_ids = req.body.ids;
//    console.log("======== deletedata =======");
//    console.log(delete_ids);
//    console.log("======== deletedata =======");
    //Mongo query
    var tableDelete = [];
    delete_ids.forEach(function (item) {     //req.body => [{'_id' : ".." , "name" : "john"}]
        tableDelete.push(new ObjectID(item));
    });

//    console.log("======== tabledelete =======");
//    console.log(tableDelete);
//    console.log("======== tabledelete =======");

    db.get().collection(table).remove({'_id': {'$in': tableDelete}}, function (err, result) {
        if (err)
            return fn(false, err);

        return fn(true, result.result.n + " document(s) deleted");
    });
}

exports.getCricAPI = function (params, fn) {
    var unique_id = params.unique_id;
    if (unique_id == '' || unique_id == undefined) {
        return fn(true, "Please provide required params unique_id!");
    }
//    console.log(unique_id);
    var unique = parseInt(unique_id);
    db.get().collection('cricapi_matches').find({'unique_id': unique}).toArray(
            function (err, rows) {
//                 console.log("==errr==");
//                console.log(err);
//                console.log("==errr end==");
//                console.log("==rows==");
//                console.log(rows);
//                console.log("==rows end==");
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
