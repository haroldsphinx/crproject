var express = require('express');
var app = module.exports = express();
var process = require('./process');
var hash = require('../../pass').hash;
app.set('views', __dirname);
app.set('view engine', 'ejs');
var LIMIT = 10;
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

app.get('/team', function (req, res) {

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

    process.getTeam(req, xparams, function (status, data, total_data) {

        var url = '/team?sort_by=' + filter_by + '&q=' + qsearch + '&page=';
        var params = {
            title: 'Team list',
            data: data,
            total_data: total_data,
            pagination: paging(total_data, curr_page, url),
            curr_page: curr_page,
            curr_filt: filter_by,
            curr_search: qsearch,
            sess_user: (req.session.username) ? req.session.username : '',
            active_page: 'team'
        };
        //console.log(params);
        res.render('team.ejs', params);
    });
});
//Add team
app.get('/team/add', function (req, res) {

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

//    process.getUser(req,xparams,function(status,data,total_data){
//       
//       var url = '/users?sort_by='+filter_by+'&q='+qsearch+'&page=';

    var params = {
        title: 'Add Team',
//            data  : data,
//            total_data : total_data,
//            pagination : paging(total_data,curr_page,url),
//            curr_page  : curr_page,
//            curr_filt  : filter_by,
//            curr_search: qsearch,
        sess_user: (req.session.username) ? req.session.username : '',
        active_page: 'team'
    };
    // console.log("base url->" + req.url);
    // console.log("base url->" + req.protocol + '://' + req.get('host'));
    // console.log(req);
    res.render('add_team.ejs', params);
    //});

});
//End Add Team


//Edit team
app.get('/team/edit/:id', function (req, res) {

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


    //var id = req.params.id;
    //console.log("user id=>" + id);
//console.log(req);
//    req.getConnection(function (err, connection) {
//
//        var query = connection.query('SELECT * FROM team WHERE team_id = ?', [id], function (err, rows)
//        {
//
//            if (err)
//                console.log("Error Selecting : %s ", err);
//            
//            var params = {
//                title: 'Edit Team',
//                data: rows,
////                total_data: total_data,
////                pagination: paging(total_data, curr_page, url),
////                curr_page: curr_page,
////                curr_filt: filter_by,
////                curr_search: qsearch,
//                sess_user: (req.session.username) ? req.session.username : '',
//                active_page: 'team'
//            };
//            console.log(params);
//            res.render('edit_team.ejs', params);
//            // res.render('edit_customer', {page_title: "Edit Customers - Node.js", data: rows});
//
//
//        });
//        //console.log(query.sql);
//    });

    process.getTeamById(req, function (err, rows) {
        if (err)
            console.log("Error Selecting : %s ", err);

        var params = {
            title: 'Edit Team',
            data: rows,
//                total_data: total_data,
//                pagination: paging(total_data, curr_page, url),
//                curr_page: curr_page,
//                curr_filt: filter_by,
//                curr_search: qsearch,
            sess_user: (req.session.username) ? req.session.username : '',
            active_page: 'team'
        };
        res.render('edit_team.ejs', params);
    });
});
//End Edit users

app.post('/team/save-team', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');

//
//upload(req, res, function (err) {
//        if (err) {
//          console.log("Something went wrong!");
//        }
//         console.log("File uploaded sucessfully!.");
//    });
    // console.log("save start end");
    process.save(req, res, function (status, msg) {

        console.log("Status : %s , message : %s ", status, msg);
        // res.type('json');
        // if(!status)
        //    res.send({ status:"false"});   

        //res.send({ status:"true"});    
        res.redirect('/team');
    });
});
app.get('/team/delete-team/:id', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');
    //var id = req.params.id;
//    req.getConnection(function (err, connection) {
//
//        connection.query("DELETE FROM team  WHERE team_id = ? ", [id], function (err, rows)
//        {
//
//            if (err)
//                console.log("message : %s ", err);
//            else
//                console.log("message : Team deleted");
//            res.redirect('/team');
//        });
//    });
    process.delete_team(req, function (status, msg) {

        console.log("Status : %s , message : %s ", status, msg);
//        res.type('json');
//        if(!status)
//            res.send({ status:"false"});   
//        
//        res.send({ status:"true"});  
        res.redirect('/team');

    });
});

