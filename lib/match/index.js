var express = require('express');
var app = module.exports = express();
var process = require('./process');
var process_team = require('../team/process');
var hash = require('../../pass').hash;
var dateFormat = require('dateformat');
app.set('views', __dirname);
app.set('view engine', 'ejs');
var LIMIT = 10;
//console.log(getMessages());
/*-------------------------------------------------
 Just a simple Pagination here, You can wrote your 
 own advanced Pagination
 ---------------------------------------------------*/

function paging(total, curr_page, url) {

    var page = '';
    var total_page = Math.ceil(total / LIMIT);
    if (total > LIMIT) {

        page = '<ul class="pagination">';
        if (parseInt(curr_page) > 1)
            page += '<li><a href="' + url + (parseInt(curr_page) - 1) + '">Prev</a></li>';
        for (x = 1; x <= total_page; x++) {

            var active = '';
            if (x == curr_page)
                active = 'class="active"';
            page += '<li ' + active + '><a href="' + url + x + '">' + x + '</a></li>';
        }
        if (parseInt(curr_page) < total_page)
            page += '<li><a href="' + url + (parseInt(curr_page) + 1) + '">Next</a></li>';
        page += '</ul>';
        var x_showed = LIMIT;
        if (total < LIMIT)
            x_showed = total

        page += '<div class="pull-right" style="margin-top:2px">'
                + '<h5>'
                + ' <small>Displaying ' + x_showed + ' of Total ' + total + ' Item(s)</small>'
                + '</h5>'
                + '</div>';
    }

    return page;
}

app.get('/match', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');

    var curr_page = (req.query.page != undefined) ? req.query.page : 1;
    var filter_by = (req.query.f != undefined) ? req.query.f : "";
    var qsearch = (req.query.q != undefined) ? req.query.q : "";
    var page = (req.query.page != undefined) ? req.query.page : 0;
    var offset = (page == 0) ? 0 : (page - 1) * LIMIT;
    /*Params for DB*/
    var xparams = {
        curr_page: curr_page,
        filter_by: filter_by,
        qsearch: qsearch,
        offset: offset,
        limit: LIMIT
    }

    process.getMatch(req, xparams, function (status, data, total_data) {



        var url = '/match?sort_by=' + filter_by + '&q=' + qsearch + '&page=';
        //Moment js for date formate
        var moment = require('moment');
        var params = {
            title: 'Match list',
            data: data,
            total_data: total_data,
            pagination: paging(total_data, curr_page, url),
            curr_page: curr_page,
            curr_filt: filter_by,
            curr_search: qsearch,
            sess_user: (req.session.username) ? req.session.username : '',
            active_page: 'match',
            moment: moment,
        };
        //console.log(params);
        res.render('match.ejs', params);
    });
});
//Add match
app.get('/match/add', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');


    process_team.getActiveTeam(req, function (req, team_data) {
        // var team_data = team_data;

        var params = {
            title: 'Add Match',
            team_data: team_data,
            sess_user: (req.session.username) ? req.session.username : '',
            active_page: 'match'
        };
        console.log(team_data);
        //console.log("base url->" + req.url);
        //console.log("base url->" + req.protocol + '://' + req.get('host'));
        // console.log(req);
        res.render('add_match.ejs', params);
    });


});
//End Add match


//Edit Match
app.get('/match/edit/:id', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');
    var curr_page = (req.query.page != undefined) ? req.query.page : 1;
    var filter_by = (req.query.f != undefined) ? req.query.f : "";
    var qsearch = (req.query.q != undefined) ? req.query.q : "";
    var page = (req.query.page != undefined) ? req.query.page : 0;
    var offset = (page == 0) ? 0 : (page - 1) * LIMIT;
    /*Params for DB*/
//    var xparams = {
//    
//         curr_page: curr_page,
//         filter_by: filter_by,
//         qsearch  : qsearch,
//         offset   : offset,
//         limit    : LIMIT
//    }
//    
//    process.getUser(req,xparams,function(status,data,total_data){
//       
//       var url = '/users?sort_by='+filter_by+'&q='+qsearch+'&page=';
//           
//       var params = {
//        
//            title : 'User list',
//            data  : data,
//            total_data : total_data,
//            pagination : paging(total_data,curr_page,url),
//            curr_page  : curr_page,
//            curr_filt  : filter_by,
//            curr_search: qsearch,
//            sess_user  :(req.session.username) ? req.session.username : ''
//       };
//       //console.log(params);
//       res.render('edit_users.ejs',params);
//    });


    var id = req.params.id;
    //console.log("user id=>" + id);
//console.log(req);

    process_team.getActiveTeam(req, function (req, team_data) {

        process.getMatchById(req, function (err, rows) {
            rows[0].datetime = dateFormat(rows[0].datetime, 'yyyy-mm-dd HH:MM:ss');
            if (err)
                console.log("Error Selecting : %s ", err);

//            var team2_data;
            console.log(rows)
            var params = {
                title: 'Edit Match',
                data: rows,
                team_data: team_data,
                sess_user: (req.session.username) ? req.session.username : '',
                active_page: 'match'
            };
            console.log(params);
            res.render('edit_match.ejs', params);
        });
//        req.getConnection(function (err, connection) {
//
//            var query = connection.query('SELECT * FROM `match` WHERE match_id = ?', [id], function (err, rows)
//            {
//                rows[0].datetime = dateFormat(rows[0].datetime, 'yyyy-mm-dd HH:MM:ss');
//                
//                if (err)
//                    console.log("Error Selecting : %s ", err);
//                var team2_data;
//                console.log(rows)
//                var params = {
//                    title: 'Edit Match',
//                    data: rows,
//                    team_data: team_data,
//                    sess_user: (req.session.username) ? req.session.username : '',
//                    active_page: 'match'
//                };
//                console.log(params);
//                res.render('edit_match.ejs', params);
//                // res.render('edit_customer', {page_title: "Edit Customers - Node.js", data: rows});
//
//
//            });
//        });
    });
    //console.log(query.sql);

});
//End Edit users


//Edit Score data
app.get('/match/edit-score/:id', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');

    var id = req.params.id;

    process_team.getActiveTeam(req, function (req, team_data) {

//        req.getConnection(function (err, connection) {
//
//            var query = connection.query('SELECT s.*,m.*, t1.team_name as team_name_1, t2.team_name as team_name_2 FROM `match` as m Left join `states` as s ON s.match_id = m.match_id Join `team` as t1 on t1.team_id = m.team_1 Join `team` as t2 on t2.team_id = m.team_2  WHERE m.match_id = ?', [id], function (err, rows)
//            {
//
//                if (err)
//                    console.log("Error Selecting : %s ", err);
//                var params = {
//                    title: 'Edit Score',
//                    data: rows,
//                    team_data: team_data,
//                    sess_user: (req.session.username) ? req.session.username : '',
//                    active_page: 'match'
//                };
//                //console.log(params);
//                res.render('edit_score.ejs', params);
//
//
//            });
//            //console.log(query.sql);
//        });
        process.getMatchEditScoreById(req, function (err, rows) {
            console.log("at debug");
            
            if (err)
                console.log("Error Selecting : %s ", err);
           // console.log(rows);
            var params = {
                title: 'Edit Score',
                data: rows,
                team_data: team_data,
                sess_user: (req.session.username) ? req.session.username : '',
                active_page: 'match'
            };

            res.render('edit_score.ejs', params);
        });


    });


});
//End Edit Score
//Edit Session
app.get('/match/edit-session/:id', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');

    var id = req.params.id;

    process_team.getActiveTeam(req, function (req, team_data) {

//        req.getConnection(function (err, connection) {
//
//            var query = connection.query('SELECT s.*,m.*, t1.team_name as team_name_1, t2.team_name as team_name_2 FROM `match` as m Left join `session` as s ON s.match_key = m.match_id Join `team` as t1 on t1.team_id = m.team_1 Join `team` as t2 on t2.team_id = m.team_2  WHERE m.match_id = ?', [id], function (err, rows)
//            {
//
//                if (err)
//                    console.log("Error Selecting : %s ", err);
//                var params = {
//                    title: 'Edit Score',
//                    data: rows,
//                    team_data: team_data,
//                    sess_user: (req.session.username) ? req.session.username : '',
//                    active_page: 'match'
//                };
//                console.log("------roww-----");
//                console.log(rows);
//                console.log(params);
//                res.render('edit_session.ejs', params);
//
//
//            });
//            console.log(query.sql);
//        });
            process.getMatchEditSessionById(req, function (err, rows) {
            
            if (err)
                console.log("Error Selecting : %s ", err);
           // console.log(rows);
                var params = {
                    title: 'Edit Session',
                    data: rows,
                    team_data: team_data,
                    sess_user: (req.session.username) ? req.session.username : '',
                    active_page: 'match'
                };
                console.log("------roww-----");
                console.log(rows);
               // console.log(params);
                res.render('edit_session.ejs', params);
        });
    });


});
//End Edit Session
app.post('/match/save-match', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');
    var datetime = dateFormat(req.body.datetime, 'yyyy-mm-dd HH:MM:ss');
    req.body.datetime = datetime;
    process.save(req, res, function (status, msg) {

        console.log("Status : %s , message : %s ", status, msg);
        // res.type('json');
        // if(!status)
        //    res.send({ status:"false"});   

        //res.send({ status:"true"});    
        res.redirect('/match');
    });
});
app.get('/match/delete-match/:id', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');
    var id = req.params.id;
    
    process.delete_match(req, function (status, msg) {

        console.log("Status : %s , message : %s ", status, msg);
 
        res.redirect('/match');

    });
});

function getActiveTeam2(req) {

    req.getConnection(function (err, connection) {


        var query = connection.query('SELECT * FROM team WHERE 1=1 and status="Active"', function (err, rows)
        {

            if (err)
                return console.log(err);

            return "return row";

        });

        //  console.log(query.sql);
    });

}
;

