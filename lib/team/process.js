var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.getTeam = function (req, params, fn) {

//    req.getConnection(function (err, connection) {
//
//        var if_search = '';
////        if (params.qsearch != '' && params.filter_by != '')
////            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
////        if (params.qsearch != '' && params.filter_by == '')
////            if_search += " AND username LIKE '%" + params.qsearch + "%' ";
//
//        var query = connection.query('SELECT * FROM team WHERE 1=1 ' + if_search + ' ORDER By `team_id` DESC LIMIT ?,?', [params.offset, params.limit], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            countAllTeam(req, params, function (total) {
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
    db.get().collection('team').find().skip(params.offset).limit(params.limit).toArray(
            function (err, rows) {
                if (err)
                    return fn(false, err);

                countAllTeam(req, params, function (total) {

                    console.log("Total data : %d", total);
                    console.log(rows);
                    return fn(true, rows, total);
                });

            });
};


function countAllTeam(req, params, fn) {

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
    db.get().collection('team').count(
            function (err, count) {

                if (err)
                    return fn(err);

                return fn(count);
            });
}

/*------------------------------------------
 Adding Team
 -------------------------------------------*/
exports.save = function (req, res, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));


    //set password = temp.username
    //hash(temp.password, function(err, salt_it, hash_it){

    //if (err) throw err;

    if (!req.files) {
        console.log('No files were uploaded.');
        temp.image_name = '';
        //Mongo query
        if (temp.team_id == '' || !(temp.team_id)) {
            var insert = {
                team_name: temp.team_name,
                team_shortname: temp.team_shortname,
                image: temp.image_name,
                status: (temp.status == 1) ? 'Active' : 'Inactive'
            };
            insertTeam(insert, function (err, result) {
                if (err)
                    return fn(false, result);

                return fn(true, result);
            });
        } else {

            var update;
            var o_id = new ObjectID(temp.team_id);
            update = {
                team_name: temp.team_name,
                team_shortname: temp.team_shortname,
                status: (temp.status == 1) ? 'Active' : 'Inactive'
            };

            updateTeam(o_id, update, function (err, result) {
                if (err)
                    return fn(false, result);

                return fn(true, result);
            });

        }
    } else {
        //console.log(req.files);
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
        var sampleFile = req.files.image;
        if (sampleFile) {
            // Use the mv() method to place the file somewhere on your server 
            var image_name = 'team_' + Date.now() + '.jpg';
            sampleFile.mv('./public/uploads/' + image_name, function (err) {
                if (err) {
                    console.log(err);
                    temp.image_name = '';

                    //Mongo query
                    if (temp.team_id == '' || !(temp.team_id)) {
                        var insert = {
                            team_name: temp.team_name,
                            team_shortname: temp.team_shortname,
                            image: temp.image_name,
                            status: (temp.status == 1) ? 'Active' : 'Inactive'
                        };
                        insertTeam(insert, function (err, result) {
                            if (err)
                                return fn(false, result);

                            return fn(true, result);
                        });
                    } else {

                        var update;
                        var o_id = new ObjectID(temp.team_id);

                        update = {
                            team_name: temp.team_name,
                            team_shortname: temp.team_shortname,
                            status: (temp.status == 1) ? 'Active' : 'Inactive'
                        };

                        updateTeam(o_id, update, function (err, result) {
                            if (err)
                                return fn(false, result);

                            return fn(true, result);
                        });

                    }

                } else {
                    temp.image_name = image_name;
                    console.log(temp.image_name);

                    //Mongo query
                    if (temp.team_id == '' || !(temp.team_id)) {
                        var insert = {
                            team_name: temp.team_name,
                            team_shortname: temp.team_shortname,
                            image: temp.image_name,
                            status: (temp.status == 1) ? 'Active' : 'Inactive'
                        };
                        insertTeam(insert, function (err, result) {
                            if (err)
                                return fn(false, result);

                            return fn(true, result);
                        });
                    } else {

                        var update;
                        var o_id = new ObjectID(temp.team_id);
                        //if (temp.image_name != '') {
                        update = {
                            team_name: temp.team_name,
                            team_shortname: temp.team_shortname,
                            image: temp.image_name,
                            status: (temp.status == 1) ? 'Active' : 'Inactive'
                        };

                        updateTeam(o_id, update, function (err, result) {
                            if (err)
                                return fn(false, result);

                            return fn(true, result);
                        });

                    }


                }
            });
        } else {
            //sample else
            temp.image_name = '';

            //Mongo query
            if (temp.team_id == '' || !(temp.team_id)) {
                var insert = {
                    team_name: temp.team_name,
                    team_shortname: temp.team_shortname,
                    image: temp.image_name,
                    status: (temp.status == 1) ? 'Active' : 'Inactive'
                };
                insertTeam(insert, function (err, result) {
                    if (err)
                        return fn(false, result);

                    return fn(true, result);
                });
            } else {

                var update;
                var o_id = new ObjectID(temp.team_id);

                update = {
                    team_name: temp.team_name,
                    team_shortname: temp.team_shortname,
                    status: (temp.status == 1) ? 'Active' : 'Inactive'
                };

                updateTeam(o_id, update, function (err, result) {
                    if (err)
                        return fn(false, result);

                    return fn(true, result);
                });

            }
        }
    }
//    req.getConnection(function (err, connection) {
//
//
//        if (temp.team_id == '') {
//
//            var insert = {
//                team_name: temp.team_name,
//                team_shortname: temp.team_shortname,
//                image: (temp.image_name != '') ? temp.image_name : '',
//                status: (temp.status == 1) ? 'Active' : 'Inactive'
//            };
//            connection.query("INSERT INTO team set ? ", insert, function (err, rows)
//            {
//
//                if (err)
//                    return fn(false, err);
//
//                return fn(true, " New team created");
//
//            });
//
//        } else {
//
//            var update;
//
//            if (temp.image_name != '') {
//                update = {
//                    team_name: temp.team_name,
//                    team_shortname: temp.team_shortname,
//                    image: temp.image_name,
//                    status: (temp.status == 1) ? 'Active' : 'Inactive'
//                };
//
//            } else {
//
//                update = {
//                    team_name: temp.team_name,
//                    team_shortname: temp.team_shortname,
//                    status: (temp.status == 1) ? 'Active' : 'Inactive'
//                };
//            }
//
//            connection.query("UPDATE team set ? WHERE team_id = ? ", [update, temp.team_id], function (err, rows)
//            {
//
//                if (err)
//                    return fn(false, err);
//
//                return  fn(true, "Team Updated");
//
//
//
//            });
//
//        }
//    });



    // }); //end of hash

};

function insertTeam(insert, fn) {
    //Mongo Query
    db.get().collection('team').save(insert, function (err, result) {
        if (err)
            return fn(true, err);

        return fn(false, " New team created");
    });
}

function updateTeam(o_id, update, fn) {
    //Mongo Query
    db.get().collection('team').update({'_id': o_id}, {$set: update}, function (err, result) {
        if (err)
            return fn(true, err);

        return  fn(false, " Team Updated");
    });
}

exports.delete_team = function (req, fn) {

    //var temp = JSON.parse(JSON.stringify(req.body));
    var o_id = new ObjectID(req.params.id);
//    req.getConnection(function (err, connection) {
//
//        connection.query("DELETE FROM team  WHERE id = ? ", [temp.team_id], function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            return fn(true, " Team deleted");
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

exports.getTeamById = function (req, fn) {

    var o_id = new ObjectID(req.params.id);
//Mongo query
    db.get().collection('team').find({'_id': o_id}).toArray(
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

exports.getActiveTeam = function (req, fn) {

//    req.getConnection(function (err, connection) {
//
//
//        var query = connection.query('SELECT * FROM team WHERE 1=1 and status="Active"', function (err, rows)
//        {
//
//            if (err)
//                return fn(false, err);
//
//            return fn(req, rows);
//
//        });
//
//        //  console.log(query.sql);
//    });

    //Mongo query
    db.get().collection('team').find({'status': "Active"}).toArray(
            function (err, rows) {
                if (err) {
                    return fn(false, err);
                }
                else {
                    return fn(req, rows);
                }
//            db.close();
            });

};



