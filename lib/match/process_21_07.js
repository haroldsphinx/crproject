exports.getMatch = function (req, params, fn) {

    req.getConnection(function (err, connection) {

        var if_search = '';
//        if (params.qsearch != '' && params.filter_by != '')
//            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
//        if (params.qsearch != '' && params.filter_by == '')
//            if_search += " AND username LIKE '%" + params.qsearch + "%' ";

        var query = connection.query('SELECT * FROM `match` WHERE 1=1 ' + if_search + ' ORDER By match_id DESC LIMIT ?,?', [params.offset, params.limit], function (err, rows)
        {

            if (err)
                return fn(false, err);

            countAllMatch(req, params, function (total) {

                //console.log("Total data : %d",total);
                return fn(true, rows, total);
            });


        });

        console.log(query.sql);
    });

};


function countAllMatch(req, params, fn) {

    req.getConnection(function (err, connection) {

        var if_search = '';
//        if(params.qsearch !='' && params.filter_by !='')
//            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
//        if(params.qsearch !='' && params.filter_by=='')
//            if_search +=" AND username LIKE '%"+params.qsearch+"%' ";

        var query = connection.query('SELECT COUNT(match_id) as all_match FROM `match` WHERE 1=1 ' + if_search + ' ', function (err, rows)
        {

            if (err)
                return fn(err);

            return fn(rows[0].all_match);
        });

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
    req.getConnection(function (err, connection) {

  //var datetime = dateFormat(temp.datetime, 'yyyy-mm-dd HH:MM:ss');
        if (temp.match_id == '') {
       
            var insert = {
                match_name: temp.match_name,
                match_type: temp.match_type,
                venue: temp.venue,
                match_result: temp.match_result,
                team_1: temp.team_1,
                team_2: temp.team_2,
                team_1_text: temp.team_1_text,
                team_2_text: temp.team_2_text,
                max_ball: temp.max_ball,
                match_comment: temp.match_comment,
                status: temp.status,
                datetime: temp.datetime
            };
            connection.query("INSERT INTO `match` set ? ", insert, function (err, rows)
            {

                if (err)
                    return fn(false, err);

                return fn(true, " New match created");

            });

        } else {

            var update;

//            if (temp.image_name != '') {
//                update = {
//                    team_name: temp.team_name,
//                    team_shortname: temp.team_shortname,
//                    image: temp.image_name,
//                    status: (temp.status == 1) ? 'Active' : 'Inactive'
//                };
//
//            } else {

            update = {
                match_name: temp.match_name,
                match_type: temp.match_type,
                venue: temp.venue,
                match_result: temp.match_result,
                team_1: temp.team_1,
                team_2: temp.team_2,
                team_1_text: temp.team_1_text,
                team_2_text: temp.team_2_text,
                max_ball: temp.max_ball,
                match_comment: temp.match_comment,
                status: temp.status,
                datetime: temp.datetime
            };
            //   }

            connection.query("UPDATE `match` set ? WHERE match_id = ? ", [update, temp.match_id], function (err, rows)
            {

                if (err)
                    return fn(false, err);

                return  fn(true, "Match Updated");



            });

        }
    });

    // }); //end of hash

};

exports.delete_match = function (req, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM `match`  WHERE id = ? ", [temp.match_id], function (err, rows)
        {

            if (err)
                return fn(false, err);

            return fn(true, " Match deleted");

        });

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
        "1_wicket": "it's Wicket",
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


exports.saveUpdateStates = function (connection, data, match_id) {
    console.log("inside update states");
    console.log(connection);
    console.log(data);
    console.log(match_id);
    var query = connection.query('SELECT COUNT(match_id) as matches FROM `states` WHERE `match_id` = ' + match_id + ' ', function (err, rows)
    {
        console.log(rows);
        console.log(rows[0].matches);
        console.log(rows["matches"]);
        if (rows[0].matches > 0) {
            //update
//            update = {
//                run: data["run"],
//                over: data["over"],
//                batsman_2_run: data["batsman_2_run"],
//                batsman_2_ball: data["batsman_2_ball"],
//                message: data["message"],
//            };

//            var nData = {};
//            for (key in data) {
//                console.log(data[key]);
//                nData[key] = data[key];
//            }
            //console.log(nData);
            // Object.assign({}, data);
            // console.log(data);
            var query2 = connection.query("UPDATE `states` set ? WHERE match_id = ? ", [data, match_id], function (err, rows) {
                // console.log(rows);
                console.log("data updated");
                //setUpData(connection, match_id);
            });
            return true;
            //console.log(query2.sql);

        } else {
            //insert
//            insert = {
//                run: data["run"],
//                over: data["over"],
//                batsman_2_run: data["batsman_2_run"],
//                batsman_2_ball: data["batsman_2_ball"],
//                message: data["message"],
//                match_id: match_id
//            };
//            var nData = {};
//            for (key in data) {
//                console.log(data[key]);
//                //nData[key] = data[key];
//            }
            var query2 = connection.query("INSERT INTO `states` set ? ", [data], function (err, rows) {
                // console.log(rows);
                console.log("data inserted");
                //setUpData(connection, match_id);
                
            });
            //console.log(query2.sql);
            return true;
        }
    });
}


function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
    return rv;
}

function setUpData(connection, match_id){
    
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

exports.getMatchListAPI = function (req, fn) {

    req.getConnection(function (err, connection) {

//        var if_search = '';
//        if (params.qsearch != '' && params.filter_by != '')
//            if_search += " AND " + params.filter_by + " LIKE '%" + params.qsearch + "%' ";
//        if (params.qsearch != '' && params.filter_by == '')
//            if_search += " AND username LIKE '%" + params.qsearch + "%' ";

        var query = connection.query('SELECT `m`.*,`t`.`team_name` as team_1_team_name, `t`.`team_shortname` as team_1_team_shortname, `t`.`image` as team_1_image, `t1`.`team_name` as team_2_team_name, `t1`.`team_shortname` as team_2_team_shortname, `t1`.`image` as team_2_image  FROM `match` as m left join `team` as t on `t`.`team_id` = `m`.`team_1` left join `team` as t1 on `t1`.`team_id` = `m`.`team_2` WHERE 1=1 AND `m`.`status` = ? ORDER By match_id DESC', [req.body.status], function (err, rows)
        {
            console.log("---match api--");
            console.log(rows);
            if (err)
                return fn(false, err);
            else
                return fn(true, rows);
          


        });

        console.log(query.sql);
    });

};
