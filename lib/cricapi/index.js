var express = require('express');
var app = module.exports = express();
var process = require('./process');
var hash = require('../../pass').hash;
app.set('views', __dirname);
app.set('view engine', 'ejs');
var LIMIT = 30;


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

app.get('/cricapi', function (req, res) {

    if (!req.session.username)
        res.redirect('/login');

    var curr_page = (req.query.page != undefined) ? req.query.page : 1;
    var sort_by = (req.query.sort_by != undefined) ? req.query.sort_by : "";
    var sort_ord = (req.query.sort_ord != undefined) ? req.query.sort_ord : "";
    var qsearch = (req.query.qsearch != undefined) ? req.query.qsearch : "";
    var page = (req.query.page != undefined) ? req.query.page : 0;
    var offset = (page == 0) ? 0 : (page - 1) * LIMIT;
    /*Params for DB*/
    var xparams = {
        curr_page: curr_page,
        sort_by: sort_by,
        sort_ord: sort_ord,
        qsearch: qsearch,
        offset: offset,
        limit: LIMIT
    }


    process.getCrickapiMatches(req, xparams, function (status, data, total_data) {

        var url = '/cricapi?sort_by=' + sort_by + '&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=';
        if (!(sort_ord) || sort_ord == 1) {
            sort_ord = -1;
        } else {
            sort_ord = 1;
        }

//        if(!(sort_ord) || sort_ord == 1){
//            sort_ord = -1;
//        }else{
//            sort_ord = 1;
//        }

        var curr_url = '/cricapi?sort_by=' + sort_by + '&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=' + page;

        var xurls = {
            unique_id_url: '/cricapi?sort_by=unique_id&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=' + page,
            team_1_url: '/cricapi?sort_by=team_1&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=' + page,
            team_2_url: '/cricapi?sort_by=team_2&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=' + page,
            type_url: '/cricapi?sort_by=type&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=' + page,
            matchStarted_url: '/cricapi?sort_by=matchStarted&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=' + page,
            date_url: '/cricapi?sort_by=date&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=' + page,
            dateTimeGMT_url: '/cricapi?sort_by=dateTimeGMT&sort_ord=' + sort_ord + '&qsearch=' + qsearch + '&page=' + page,
        }

        var params = {
            title: 'CrickApi Matches list',
            data: data,
            total_data: total_data,
            pagination: paging(total_data, curr_page, url),
            curr_page: curr_page,
            curr_sort_by: sort_by,
            curr_sort_ord: sort_ord,
            curr_search: qsearch,
            sess_user: (req.session.username) ? req.session.username : '',
            active_page: 'crickapimatches',
            curr_url: curr_url,
            xurls: xurls
        };
        //console.log(params);
        res.render('cricapimatches.ejs', params);
    });
});

app.get('/cricketMatches', function (req, res) {
    process.saveCricketMatches(function (fn) {
        var json_return = {"response_status": "1", "message": "success!"};
        //return json_return;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json_return));
    });
});

app.post('/cricapi/deletedata', function (req, res) {
    process.removeCricapi(req, function (status, msg) {
        console.log("Status : %s , message : %s ", status, msg);
        res.redirect('/cricapi');
    });
});