"use strict";
this.data_to_store = {};
this.match_data = [];
this.session_data = [];
var self = this;
//global.data_to_store = [];
//var name = prompt("What is your name?");
//for (var i = 0; i < 300; i++) {
//    var sock = new WebSocket("ws://localhost:5001");
//    sock.onopen = function (event) {
//        console.log("socket open --- "+i);
//    };
//}
var sock = new WebSocket("ws://35.154.204.129:5001");
//var sock = new WebSocket("ws://localhost:5001");

//Client side App side changes
sock.onopen = function (event) {
    console.log("Socket connection open!");
//    sock.send(JSON.stringify({
//        type: "connection_manager",
//        id: "socket_admin", //'id' + (new Date()).getTime()                // data: data,
//        uid: 'id_' + (new Date()).getTime()
//    }));

    sock.send(JSON.stringify({
        type: "connection_open",
        id: "socket_admin", //'id' + (new Date()).getTime()    
        uid: '123456',
        utype: 'desktop'
    }));
}

//Conection close
sock.onclose = function (event) {
    console.log("connection is clossing.....");
    console.log();
    sock.send(JSON.stringify({
        type: "connection_close",
        id: "socket_admin", //'id' + (new Date()).getTime()    
        uid: '123456',
        utype: 'ios'
    }));
}

//Client side App side changes end

this.getMessages = function () {
    var messages = {
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
        // "bowlerhold" : "Bowler Ruka",
        "freehit": "Free Hit!",
        //  "catchout" : "Catch Out!",
        "catchdrop": "Catch Droped!",
        "notout": "Not Out",
//            "decisionpending":'Decision Pending',
        'over': 'Over',
        //  "ruko" : "Ruko Ruko Ruko",
        "1_wide": "Wide",
        "2_wide": "Wide+1",
        "3_wide": "Wide+2",
        "4_wide": "Wide+3",
        "5_wide": "Wide+4",
        "1_nb": "No Ball",
        "2_nb": "No Ball+1",
        "3_nb": "No Ball+2",
        "4_nb": "No Ball+3",
        "5_nb": "No Ball+4",
        "6_nb": "No Ball+5",
        "7_nb": "No Ball+6",
        "1_lb": "Leg bye 1",
        "2_lb": "Leg bye 2",
        "3_lb": "Leg bye 3",
        "4_lb": "Leg bye 4",
        "5_lb": "Leg bye 5",
        "1_b": "bye 1",
        "2_b": "bye 2",
        "3_b": "bye 3",
        "4_b": "bye 4",
        "5_b": "bye 5",
        "spinner": "Spinner Aya",
        "faster": "Faster Aya",
        "bowler_ruka": "Bowler Ruka",
        "chalu_rakho_chalu": "Chalu rakho chalu",
        "security_problem_he": "Security problem he",
        "umpire_check_karega": "Umpire Check karega",
        "barish_chalu": "Barish Chalu",
        "game_ruka": "Game ruka hua hai!"

    };
    return messages;
}

this.setMatchData = function () {

    var match_id = $("#match_id").val();
    var strick = $("input[name='strick']:checked").val() ? $("input[name='strick']:checked").val() : "";

    var message = $("#message_text").val();
    var target_text = $("#target_text").val();
    var team_name_text = $("#team_name_text").val();
    var batsman_1_run_text = $("#batsman_1_run_text").val();
    var batsman_1_ball_text = $("#batsman_1_ball_text").val();
    var batsman_2_run_text = $("#batsman_2_run_text").val();
    var batsman_2_ball_text = $("#batsman_2_ball_text").val();
    var batsman_1_text = $("#batsman_1_text").val();
    var batsman_2_text = $("#batsman_2_text").val();
    var bowler_text = $("#bowler_text").val();
    var run_text = $("#run_text").val();
    var over_text = $("#over_text").val();
    var wicket_text = $("#wicket_text").val();
    self.match_data[match_id] = [];
    self.match_data[match_id]["match_id"] = match_id;
    self.match_data[match_id]["strick"] = strick;
    self.match_data[match_id]["message"] = message;
    self.match_data[match_id]["target_text"] = target_text;
    self.match_data[match_id]["team_name_text"] = team_name_text;
    self.match_data[match_id]["batsman_1_run_text"] = batsman_1_run_text;
    self.match_data[match_id]["batsman_1_ball_text"] = batsman_1_ball_text;
    self.match_data[match_id]["batsman_2_run_text"] = batsman_2_run_text;
    self.match_data[match_id]["batsman_2_ball_text"] = batsman_2_ball_text;
    self.match_data[match_id]["batsman_1_text"] = batsman_1_text;
    self.match_data[match_id]["batsman_2_text"] = batsman_2_text;
    self.match_data[match_id]["bowler_text"] = bowler_text;
    self.match_data[match_id]["run_text"] = run_text;
    self.match_data[match_id]["over_text"] = over_text;
    self.match_data[match_id]["wicket_text"] = wicket_text;
}


this.setData = function (match_data) {
    console.log(match_data);
    $("#message_text").val(match_data["message_text"]);
    $("#target_text").val(match_data["target_text"]);
    $("#team_name_text").val(match_data["team_name_text"]);
    $("#batsman_1_run_text").val(match_data["batsman_1_run_text"]);
    $("#batsman_1_ball_text").val(match_data["batsman_1_ball_text"]);
    $("#batsman_2_run_text").val(match_data["batsman_2_run_text"]);
    $("#batsman_2_ball_text").val(match_data["batsman_2_ball_text"]);
    $("#batsman_1_text").val(match_data["batsman_1_text"]);
    $("#batsman_2_text").val(match_data["batsman_2_text"]);
    $("#bowler_text").val(match_data["bowler_text"]);
    $("#run_text").val(match_data["run_text"]);
    $("#over_text").val(match_data["over_text"]);
    $("#wicket_text").val(match_data["wicket_text"]);
}

this.setSessionData = function () {

    var match_id = $("#match_id").val();

    var market_rate = $("#market_rate").val();
    var session = $("#session").val();
    var favorite = $("#favorite").val();
    var over = $("#over").val();

    self.session_data["match_id"] = match_id;
    self.session_data["market_rate"] = market_rate;
    self.session_data["session"] = session;
    self.session_data["favorite"] = favorite;
    self.session_data["over"] = over;

}

function setMessageKey(sel, buttonkey) {

    //console.log(global.data_to_store);
//console.log(this.data_to_store2);
//console.log(data_to_store2);
    // alert(sel);
    // console.log(sel);
    // console.log("message send start");
//    sock.send(JSON.stringify({
//        type: "broadcast",
//        id: "socket_admin", //'id' + (new Date()).getTime()
//        data: "some message"
//    }));
    //console.log("message send end");
    if (typeof (buttonkey) === 'undefined')
        buttonkey = false;
    if (!buttonkey) {
        var message = sel.value;
    } else {
        var message = sel;
    }
    var match_id = $("#match_id").val();
    var strick = $("input[name='strick']:checked").val() ? $("input[name='strick']:checked").val() : "";

    var target_text = $("#target_text").val();
    var team_name_text = $("#team_name_text").val();
    var batsman_1_run_text = $("#batsman_1_run_text").val();
    var batsman_1_ball_text = $("#batsman_1_ball_text").val();
    var batsman_2_run_text = $("#batsman_2_run_text").val();
    var batsman_2_ball_text = $("#batsman_2_ball_text").val();
    var batsman_1_text = $("#batsman_1_text").val();
    var batsman_2_text = $("#batsman_2_text").val();
    var bowler_text = $("#bowler_text").val();
    var run_text = $("#run_text").val();
    var over_text = $("#over_text").val();
    var wicket_text = $("#wicket_text").val();

//    this.match_data = {
//        "message": message,
//        "match_id": match_id,
//        "strick": strick,
//        "target_text":target_text,
//        "team_name_text":team_name_text,
//        "batsman_1_run_text":batsman_1_run_text,
//        "batsman_1_ball_text":batsman_1_ball_text,
//        "batsman_2_run_text":batsman_2_run_text,
//        "batsman_2_ball_text":batsman_2_ball_text,
//        "batsman_1_text":batsman_1_text,
//        "batsman_2_text":batsman_2_text,
//        "bowler_text":bowler_text,
//        "run_text":run_text,
//        "over_text":over_text,
//        "wicket_text":wicket_text   
//    };
    //self.match_data["message"] = message;
    self.match_data[match_id] = [];
    self.match_data[match_id]["match_id"] = match_id;
    self.match_data[match_id]["strick"] = strick;
    self.match_data[match_id]["message"] = message;
    self.match_data[match_id]["target_text"] = target_text;
    self.match_data[match_id]["team_name_text"] = team_name_text;
    self.match_data[match_id]["batsman_1_run_text"] = batsman_1_run_text;
    self.match_data[match_id]["batsman_1_ball_text"] = batsman_1_ball_text;
    self.match_data[match_id]["batsman_2_run_text"] = batsman_2_run_text;
    self.match_data[match_id]["batsman_2_ball_text"] = batsman_2_ball_text;
    self.match_data[match_id]["batsman_1_text"] = batsman_1_text;
    self.match_data[match_id]["batsman_2_text"] = batsman_2_text;
    self.match_data[match_id]["bowler_text"] = bowler_text;
    self.match_data[match_id]["run_text"] = run_text;
    self.match_data[match_id]["over_text"] = over_text;
    self.match_data[match_id]["wicket_text"] = wicket_text;

    //Today customization of assignments

    var message_text = message;
    //var message = message.data.message;
    var match_id = match_id;
    var message_ext = message_text.split("_");
    var strick = strick;
    var batsman_strick;

    if (message_ext[0]) {
        if (strick == 'strick_1') {
            batsman_strick = "batsman_1";
        } else {
            batsman_strick = "batsman_2";
        }
    }

    var batsman_strick_value = $("#" + batsman_strick + "_text").val();
    console.log(message_ext);
//Set undo function
    //if (typeof self.data_to_store[match_id] === 'undefined' || self.data_to_store[match_id] === null) {
        self.data_to_store[match_id] = [];
        console.log("assign empty");
   // }
    var wicket_alert = false;
    if ((message_ext[1])) {

        if (message_ext[1] === "run") {
            //Run Data 
            var new_run = (parseInt(self.match_data[match_id]["run_text"]) + parseInt(message_ext[0]));
            self.data_to_store[match_id]["run"] = new_run || 0;
            self.match_data[match_id]["run_text"] = new_run || 0;

            if (isOdd(message_ext[0])) {
                console.log(message_ext[0]);
                console.log("odd");
                $('input[name="strick"]').not(':checked').prop("checked", true);
            } else {
                console.log(message_ext[0]);
                console.log("even");
            }
            //Run Data End

            //Over Data
            var over = (parseFloat(self.match_data[match_id]["over_text"]) + parseFloat(0.1)).toFixed(1);
            over = toNumberString(over);
            var over_ex = over.split(".");
            if (over_ex[1] >= 6) {
                over = parseInt(over_ex[0]) + parseInt(1);
            }
            over = parseFloat(over).toFixed(1);
            over = (over === undefined || over === null) ? 0 : over;
            self.data_to_store[match_id]["over"] = over || 0;
            self.match_data[match_id]["over_text"] = over || 0;
            //Over Data End

            //Batsman Data
            //RUN
            var batsman_run = batsman_strick + "_run";
            var batsman_run_num = (parseInt(self.match_data[match_id][batsman_run + "_text"]) + parseInt(message_ext[0]));
            batsman_run_num = (batsman_run_num === undefined || batsman_run_num === null) ? 0 : batsman_run_num;
            self.data_to_store[match_id][batsman_run] = batsman_run_num || 0;
            self.match_data[match_id][batsman_run + "_text"] = batsman_run_num || 0;
            //BALL
            var batsman_ball = batsman_strick + "_ball";
            var batsman_ball_num = (parseInt(self.match_data[match_id][batsman_ball + "_text"]) + parseInt(1));
            batsman_ball_num = (batsman_ball_num === undefined || batsman_ball_num === null) ? 0 : batsman_ball_num;
            self.data_to_store[match_id][batsman_ball] = batsman_ball_num || 0;
            self.match_data[match_id][batsman_ball + "_text"] = batsman_ball_num || 0;
            //Batsman Data End
        }
        if (message_ext[1] === "wicket") {
            var new_wicket = parseInt(self.match_data[match_id]["wicket_text"]) + parseInt(message_ext[0]);
            if (new_wicket <= 10) {

                //Over Data
                var over = (parseFloat(self.match_data[match_id]["over_text"]) + parseFloat(0.1)).toFixed(1);
                over = toNumberString(over);
                var over_ex = over.split(".");
                if (over_ex[1] >= 6) {
                    over = parseInt(over_ex[0]) + parseInt(1);
                }
                over = parseFloat(over).toFixed(1);
                over = (over === undefined || over === null) ? 0 : over;
                self.data_to_store[match_id]["over"] = over || 0;
                self.match_data[match_id]["over_text"] = over || 0;
                //Over Data End

                new_wicket = (new_wicket === undefined || new_wicket === null) ? 0 : new_wicket;
                self.data_to_store[match_id]["wicket"] = new_wicket || 0;
                self.match_data[match_id]["wicket_text"] = new_wicket || 0;
                console.log(batsman_strick);
                console.log(batsman_strick_value);
                var bat_val = batsman_strick_value + " (OUT)";
                console.log(bat_val)
                //self.match_data
                //$("#"+batsman_strick+"_text").val(bat_val); 
                self.match_data[match_id][batsman_strick + "_text"] = bat_val;
                wicket_alert = true;
            }
        }
        if (message_ext[1] === "wide") {
            //Run Data 
            var new_run = (parseInt(self.match_data[match_id]["run_text"]) + parseInt(message_ext[0]));
            self.data_to_store[match_id]["run"] = new_run || 0;
            self.match_data[match_id]["run_text"] = new_run || 0;
            //Run Data End

        }
        if (message_ext[1] === "nb") {
            //Run Data 
            var new_run = (parseInt(self.match_data[match_id]["run_text"]) + parseInt(message_ext[0]));
            self.data_to_store[match_id]["run"] = new_run || 0;
            self.match_data[match_id]["run_text"] = new_run || 0;
            //Run Data End
        }
        if (message_ext[1] === "lb") {
            //Run Data 
            var new_run = (parseInt(self.match_data[match_id]["run_text"]) + parseInt(message_ext[0]));
            self.data_to_store[match_id]["run"] = new_run || 0;
            self.match_data[match_id]["run_text"] = new_run || 0;
            //Run Data End

            //Over Data
            var over = (parseFloat(self.match_data[match_id]["over_text"]) + parseFloat(0.1)).toFixed(1);
            over = toNumberString(over);
            var over_ex = over.split(".");
            if (over_ex[1] >= 6) {
                over = parseInt(over_ex[0]) + parseInt(1);
            }
            over = parseFloat(over).toFixed(1);
            over = (over === undefined || over === null) ? 0 : over;
            self.data_to_store[match_id]["over"] = over || 0;
            self.match_data[match_id]["over_text"] = over || 0;
            //Over Data End

            //Batsman Data
            //#BALL
            var batsman_ball = batsman_strick + "_ball";
            var batsman_ball_num = (parseInt(self.match_data[match_id][batsman_ball + "_text"]) + parseInt(1));
            batsman_ball_num = (batsman_ball_num === undefined || batsman_ball_num === null) ? 0 : batsman_ball_num;
            console.log(batsman_ball_num);
            self.data_to_store[match_id][batsman_ball] = batsman_ball_num || 0;
            self.match_data[match_id][batsman_ball + "_text"] = batsman_ball_num || 0;
            //Batsman Data End
        }
        if (message_ext[1] === "b") {
            //Run Data 
            var new_run = (parseInt(self.match_data[match_id]["run_text"]) + parseInt(message_ext[0]));
            self.data_to_store[match_id]["run"] = new_run || 0;
            self.match_data[match_id]["run_text"] = new_run || 0;
            //Run Data End

            //Over Data
            var over = (parseFloat(self.match_data[match_id]["over_text"]) + parseFloat(0.1)).toFixed(1);
            over = toNumberString(over);
            var over_ex = over.split(".");
            if (over_ex[1] >= 6) {
                over = parseInt(over_ex[0]) + parseInt(1);
            }
            over = parseFloat(over).toFixed(1);
            over = (over === undefined || over === null) ? 0 : over;
            self.data_to_store[match_id]["over"] = over || 0;
            self.match_data[match_id]["over_text"] = over || 0;
            //Over Data End

            //Batsman Data
            //#BALL
            var batsman_ball = batsman_strick + "_ball";
            var batsman_ball_num = (parseInt(self.match_data[match_id][batsman_ball + "_text"]) + parseInt(1));
            batsman_ball_num = (batsman_ball_num === undefined || batsman_ball_num === null) ? 0 : batsman_ball_num;
            console.log(batsman_ball_num);
            self.data_to_store[match_id][batsman_ball] = batsman_ball_num || 0;
            self.match_data[match_id][batsman_ball + "_text"] = batsman_ball_num || 0;
            //Batsman Data End
        }


    }
    var allMessages = self.getMessages();

    self.data_to_store[match_id]["message"] = allMessages[message_text];
    self.data_to_store[match_id]["message_key"] = message_text;
    self.data_to_store[match_id]["match_id"] = match_id;
    self.data_to_store[match_id]["strick"] = strick;

    self.match_data[match_id]["message_text"] = allMessages[message_text];
    console.log("---Match_data----");
    self.setData(self.match_data[match_id]);
    //End
    var key;
    var match_data_obj = {};
    // match_data_obj[match_id] = {};
    for (key in self.match_data[match_id]) {
        //console.log(data[key]);
        match_data_obj[key] = self.match_data[match_id][key];
    }
    var key;
    var data_to_store_obj = {};
    for (key in self.data_to_store[match_id]) {
        //console.log(data[key]);
        data_to_store_obj[key] = self.data_to_store[match_id][key];
    }
    console.log(data_to_store_obj);
    var data = {'message': message, 'match_id': match_id, 'strick': strick,
        match_data: match_data_obj,
        data_to_store: data_to_store_obj};

    console.log("---SENT Match_data----");
    console.log(data);
    sock.send(JSON.stringify({
        type: "broadcast",
        id: "socket_admin", //'id' + (new Date()).getTime()
        data: data,
    }));
    $('#message_select').prop('selectedIndex', 0);
    $('#message_select2').prop('selectedIndex', 0);
    $('#message_select3').prop('selectedIndex', 0);
//    if(wicket_alert){
//        alert("Change/Reset Strick manually!");
//    }
    console.log("SENT DONE");
}

function setStatesFields(sel) {
    var data_to_store_one = [];
    var filed_name = sel.name;
    var filed_value = sel.value;
    var match_id = $("#match_id").val();

    data_to_store_one[filed_name] = filed_value;
    data_to_store_one["match_id"] = match_id;

    console.log(data_to_store_one);

    //Set Up all fields in constant
    self.setMatchData();
    // console.log(self.match_data);

    var key;
    var match_data_obj = {};
    //match_data_obj[match_id] = {};
    for (key in self.match_data[match_id]) {
        //console.log(data[key]);
        match_data_obj[key] = self.match_data[match_id][key];
    }
    var key;
    var data_to_store_obj = {};
    for (key in data_to_store_one) {
        //console.log(data[key]);
        data_to_store_obj[key] = data_to_store_one[key];
    }

    var data = {'match_id': match_id,
        match_data: match_data_obj,
        data_to_store: data_to_store_obj};
console.log(data);
    sock.send(JSON.stringify({
        type: "broadcast",
        id: "socket_admin", //'id' + (new Date()).getTime()
        data: data,
    }));
}

function setMessageKey_text(sel) {
    var data_to_store_one = [];
    var filed_name = sel.name;
    var filed_value = sel.value;

    var match_id = $("#match_id").val();

    data_to_store_one[filed_name] = filed_value;
    data_to_store_one["message_key"] = "";
    data_to_store_one["match_id"] = match_id;

    //Set Up all fields in constant
    self.setMatchData();

    var key;
    var match_data_obj = {};
    //match_data_obj[match_id] = {};
    for (key in self.match_data[match_id]) {
        //console.log(data[key]);
        match_data_obj[key] = self.match_data[match_id][key];
    }
    var key;
    var data_to_store_obj = {};
    for (key in data_to_store_one) {
        //console.log(data[key]);
        data_to_store_obj[key] = data_to_store_one[key];
    }

    var data = {'match_id': match_id,
        match_data: match_data_obj,
        data_to_store: data_to_store_obj};
console.log(data);
    sock.send(JSON.stringify({
        type: "broadcast",
        id: "socket_admin", //'id' + (new Date()).getTime()
        data: data,
    }));

}

function setSessionFields(sel) {
    var data_to_store_one = [];
    var filed_name = sel.name;
    var filed_value = sel.value;
    var match_id = $("#match_id").val();
//    if (filed_name == 'market_rate_1') {
//        var market_rate_2_init = parseInt(filed_value) + parseInt(2);
//        $("#market_rate_2").val(market_rate_2_init);
//    }
//    if (filed_name == 'session_1') {
//        var session_1_init = parseInt(filed_value) + parseInt(1);
//        $("#session_2").val(session_1_init);
//    }
    data_to_store_one[filed_name] = filed_value;
    data_to_store_one["match_key"] = match_id;

    self.setSessionData();

    var key;
    var session_data_obj = {};
    for (key in self.session_data) {
        //console.log(data[key]);
        session_data_obj[key] = self.session_data[key];
    }
    var key;
    var data_to_store_obj = {};
    for (key in data_to_store_one) {
        //console.log(data[key]);
        data_to_store_obj[key] = data_to_store_one[key];
    }

    var data = {'match_id': match_id,
        session_data: session_data_obj,
        data_to_store: data_to_store_obj};

    sock.send(JSON.stringify({
        type: "broadcast_session",
        id: "socket_admin", //'id' + (new Date()).getTime()
        data: data,
    }));

}

function setSessionFields2(sel) {
    var data_to_store_one = [];
//    var filed_name = sel.name;
//    var filed_value = sel.value;
//    var match_id = $("#match_id").val();
//    if (filed_name == 'market_rate') {
//        var filed_name_1 = "market_rate_1";
//        var filed_name_2 = "market_rate_2";
//
//    }
//    if (filed_name == 'session') {
//        var filed_name_1 = "session_1";
//        var filed_name_2 = "session_2";
//
//    }
//    var field_values = filed_value.split("-");

//    var filed_name = sel.name;
//    var filed_value = sel.value;
//    var match_id = $("#match_id").val();
//    var filed_values = [];
//    if (filed_name == 'market_rate_1') {
//        var market_rate_2_init = parseInt(filed_value) + parseInt(2);
//        $("#market_rate_2").val(market_rate_2_init);
//        var filed_name_1 = "market_rate_1";
//        var filed_name_2 = "market_rate_2";
//        filed_values[0] = parseInt(filed_value);
//        filed_values[1] = market_rate_2_init;
//        
//    }
//    if (filed_name == 'session_1') {
//        var session_1_init = parseInt(filed_value) + parseInt(1);
//        $("#session_2").val(session_1_init);
//        var filed_name_1 = "session_1";
//        var filed_name_2 = "session_2";
//        field_values[0] = parseInt(filed_value);
//        field_values[1] = session_1_init;
//    }

    var filed_name = sel.name;
    var filed_value = sel.value;
    var match_id = $("#match_id").val();
//    if (filed_name == 'market_rate_1') {
//        var market_rate_2_init = parseInt(filed_value) + parseInt(2);
//        $("#market_rate_2").val(market_rate_2_init);
//
//        var filed_name_1 = "session_1";
//        var filed_name_2 = "session_2";
//    }
    if (filed_name == 'session_1' || filed_name == 'session_2') {
        if (filed_name == 'session_1') {
            var session_cal = $("input[name='session_cal']:checked").val();
            var session_1_init = parseInt(filed_value) + parseInt(session_cal);
            $("#session_2").val(session_1_init);
        }
    }

    var filed_name_1 = "session_1";
    var filed_name_2 = "session_2";
    var filed_value_1 = $("#session_1").val();
    var filed_value_2 = $("#session_2").val();
    var numbe_eleven = ($('#numbe_eleven').is(':checked')) ? "1" : "0";

    data_to_store_one[filed_name_1] = filed_value_1;
    data_to_store_one[filed_name_2] = filed_value_2;
    data_to_store_one["numbe_eleven"] = numbe_eleven;

    data_to_store_one["match_key"] = match_id;

    self.setSessionData();

    var key;
    var session_data_obj = {};
    for (key in self.session_data) {
        //console.log(data[key]);
        session_data_obj[key] = self.session_data[key];
    }
    var key;
    var data_to_store_obj = {};
    for (key in data_to_store_one) {
        //console.log(data[key]);
        data_to_store_obj[key] = data_to_store_one[key];
    }

    var data = {'match_id': match_id,
        session_data: session_data_obj,
        data_to_store: data_to_store_obj};

    sock.send(JSON.stringify({
        type: "broadcast_session",
        id: "socket_admin", //'id' + (new Date()).getTime()
        data: data,
    }));

//    if (filed_name == 'market_rate_1') {
//        var market_rate_2_init = parseInt(filed_value) + parseInt(2);
//        $("#market_rate_2").val(market_rate_2_init);
//    }
//    if (filed_name == 'session_1') {
//        var session_1_init = parseInt(filed_value) + parseInt(1);
//        $("#session_2").val(session_1_init);
//    }
//    $.ajax({
//        type: 'POST',
//        url: base_url + "ajax_call/setsession2",
////         data: {'sending_d_t': sending_d, 'every_d_t': every_d, 'weeks_on_d_t': weeks_on_d, 'day_of_month': day_of_month, 'monthly_count': monthly_count, 'monthly': monthly, 'at_d_t': at_d, 'sending_to_email_d_t': sending_to_email_d, 'to_email': to_email, 'ends_in_t': ends_in, 'on': on}
//        data: {'filed_name_1': filed_name_1, 'filed_value_1': field_values[0], 'filed_name_2': filed_name_2, 'filed_value_2': field_values[1], 'match_id': match_id},
//        success: function (data) {
//            data = JSON.parse(data);
//            if (data.message != "") {
//                //   $("#market_rate_1").val(data.market_rate_1);
//                //if(!empty(data.market_rate_2)){
////                if (typeof (data.market_rate_2) != "undefined" && data.market_rate_2 !== null) {
////                    $("#market_rate_2").val(data.market_rate_2);
////                }
////                  $("#market_rate_2").val("0");
//                $("#session_1").val("0");
//                $("#session_2").val("0");
//            }
//            //$('#message_select').prop('selectedIndex', 0);
//
//        }
//    });

}


//OnstrickChange(this)
function toNumberString(num) {
    if (Number.isInteger(num)) {
        return num + ".0"
    } else {
        return num.toString();
    }
}

var isOdd = function (x) {
    return x & 1;
};
var isEven = function (x) {
    return !(x & 1);
};
