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
var sock = new WebSocket("ws://ws.cricketfastliveline.com:5002");

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

    setTimeout(function () {
        var data = {
            'api': 'getCricStartedMatchAPI',
            'params': {},
        };
        sock.send(JSON.stringify({
            type: "broadcast_api",
            id: "socket_admin",
            data: data,
        }));

    }, 3000);


}

//Conection close
sock.onclose = function (event) {
    $(".alert-danger").removeClass("connection_close");
    alert("Connection lost! Please refresh the page to reconnect!");
    location.reload();
    console.log("------------");
    console.log("connection is clossing.....");
    console.log("------------");
    sock.send(JSON.stringify({
        type: "connection_close",
        id: "socket_admin", //'id' + (new Date()).getTime()    
        uid: '123456',
        utype: 'ios'
    }));
}



sock.onmessage = function (message) {

    //var message = JSON.parse(message);
    console.log("========= client side recived message =============");
    console.log(message);
    console.log("========= client side recived message END =============");

};
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
        "game_ruka": "Game ruka hua hai!",
        "player_aa_gaye": "Player aa Gaye!",
        "kalmilenge_dosto": "Kal Milenge Dosto!",
        "barish_ruka": "Barish ruka Hai",
        "cover_a_gaye": "Cover aa Gaye",
        "cover_hata_diye": "Cover hata Diye",
    };
    return messages;
}

this.getMessagesSingular = function () {
    var messages = {
        'ball': "Ball",
        "0_run": "0",
        "1_run": "1",
        "2_run": "2",
        "3_run": "3",
        "4_run": "4",
        "5_run": "5",
        "6_run": "6",
        "1_wicket": "W",
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
        "1_wide": "WD",
        "2_wide": "WD+1",
        "3_wide": "WD+2",
        "4_wide": "WD+3",
        "5_wide": "WD+4",
        "1_nb": "NB",
        "2_nb": "NB+1",
        "3_nb": "NB+2",
        "4_nb": "NB+3",
        "5_nb": "NB+4",
        "6_nb": "NB+5",
        "7_nb": "NB+6",
        "1_lb": "LB+1",
        "2_lb": "LB+2",
        "3_lb": "LB+3",
        "4_lb": "LB+4",
        "5_lb": "LB+5",
        "1_b": "B+1",
        "2_b": "B+2",
        "3_b": "B+3",
        "4_b": "B+4",
        "5_b": "B+5",
        "spinner": "Spinner Aya",
        "faster": "Faster Aya",
        "bowler_ruka": "Bowler Ruka",
        "chalu_rakho_chalu": "Chalu rakho chalu",
        "security_problem_he": "Security problem he",
        "umpire_check_karega": "Umpire Check karega",
        "barish_chalu": "Barish Chalu",
        "game_ruka": "Game ruka hua hai!",
        "player_aa_gaye": "Player aa Gaye!",
        "kalmilenge_dosto": "Kal Milenge Dosto!",
        "barish_ruka": "Barish ruka Hai",
        "cover_a_gaye": "Cover aa Gaye",
        "cover_hata_diye": "Cover hata Diye",
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



this.balls_array_count = parseInt($("#balls_array_count").val());
var ball = parseFloat($("#last_ball").val());
//ball = toNumberString(ball);
this.glob_ball = ball;
//if (ball[1] >= 6) {
//    ball = parseInt(ball[0]) + parseInt(1);
//}

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
    var allMessages = self.getMessages();
    var allMessagesSingular = self.getMessagesSingular();
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
//                var bat_val = batsman_strick_value + " *";
//                self.match_data[match_id][batsman_strick + "_text"] = bat_val;
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
                $('input[name="strick"]').not(':checked').prop("checked", true);
                over = parseInt(over_ex[0]) + parseInt(1);
            }
            //Six Ball 
            self.glob_ball++;
//            if (self.glob_ball <= 6) {
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = message_ext[0];
//            } else {
//                self.glob_ball = 0;
//                self.glob_ball++;
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = message_ext[0];
//            }
            var ball_txt = allMessagesSingular[message_text];
            $("#" + "ball_" + self.glob_ball).val(ball_txt);
            $("#last_ball").val(self.glob_ball);
            //
            self.balls_array_count++
//            if (self.balls_array_count <= 6) {
//                self.balls_array.pop();
//                self.balls_array.unshift(ball_txt);
//            } else {
            self.balls_array.shift();
            self.balls_array.push(ball_txt);

            //}
            self.data_to_store[match_id]["last_ball"] = self.glob_ball;
            self.data_to_store[match_id]["balls_array"] = self.balls_array;
            self.data_to_store[match_id]["balls_array_count"] = self.balls_array_count;
            //

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
                    $('input[name="strick"]').not(':checked').prop("checked", true);
                    over = parseInt(over_ex[0]) + parseInt(1);
                }
                //Six Ball 
//                var ball = over_ex[1];
//                console.log("ball_" + ball);
//                self.data_to_store[match_id]["ball_" + ball] = "W";

                over = parseFloat(over).toFixed(1);
                over = (over === undefined || over === null) ? 0 : over;
                self.data_to_store[match_id]["over"] = over || 0;
                self.match_data[match_id]["over_text"] = over || 0;
                //Over Data End

                //Six Ball 
                self.glob_ball++;
//                if (self.glob_ball <= 6) {
//                    console.log("self - ball_" + self.glob_ball);
//                    self.data_to_store[match_id]["ball_" + self.glob_ball] = "W";
//                } else {
//                    self.glob_ball = 0;
//                    self.glob_ball++;
//                    console.log("self - ball_" + self.glob_ball);
//                    self.data_to_store[match_id]["ball_" + self.glob_ball] = "W";
//                }
                var ball_txt = allMessagesSingular[message_text];
                $("#" + "ball_" + self.glob_ball).val(ball_txt);
                $("#last_ball").val(self.glob_ball);

                self.balls_array_count++
//                if (self.balls_array_count <= 6) {
//                    self.balls_array.pop();
//                    self.balls_array.unshift(ball_txt);
//                } else {
                self.balls_array.shift();
                self.balls_array.push(ball_txt);

                //}
                self.data_to_store[match_id]["last_ball"] = self.glob_ball;
                self.data_to_store[match_id]["balls_array"] = self.balls_array;
                self.data_to_store[match_id]["balls_array_count"] = self.balls_array_count;
                //Six Ball end

                new_wicket = (new_wicket === undefined || new_wicket === null) ? 0 : new_wicket;
                self.data_to_store[match_id]["wicket"] = new_wicket || 0;
                self.match_data[match_id]["wicket_text"] = new_wicket || 0;
                console.log(batsman_strick);
                console.log(batsman_strick_value);
                var bat_val = batsman_strick_value + " (OUT)";
                console.log(bat_val)
                //self.match_data
                //$("#"+batsman_strick+"_text").val(bat_val); 
                self.data_to_store[match_id][batsman_strick] = bat_val;
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

            //Six Ball 
            self.glob_ball++;
//            if (message_ext[0] > 1) {
//                var ball_txt = "WD" + "+" + message_ext[0];
//            } else {
//                var ball_txt = "WD";
//            }
            var ball_txt = allMessagesSingular[message_text];
//            if (self.glob_ball <= 6) {
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = ball_txt;
//            } else {
//                self.glob_ball = 0;
//                self.glob_ball++;
//                console.log("self - ball_" + self.glob_ball);
//
//            }
            self.data_to_store[match_id]["ball_" + self.glob_ball] = ball_txt;
            $("#" + "ball_" + self.glob_ball).val(ball_txt);
            $("#last_ball").val(self.glob_ball);
//            self.balls_array.shift();
//            self.balls_array.push(ball_txt);
//            self.data_to_store[match_id]["last_ball"] = self.glob_ball;
            self.balls_array_count++
//            if (self.balls_array_count <= 6) {
//                self.balls_array.pop();
//                self.balls_array.unshift(ball_txt);
//            } else {
            self.balls_array.shift();
            self.balls_array.push(ball_txt);
            //}
            self.data_to_store[match_id]["last_ball"] = self.glob_ball;
            self.data_to_store[match_id]["balls_array"] = self.balls_array;
            self.data_to_store[match_id]["balls_array_count"] = self.balls_array_count;
            //Six Ball end

        }
        if (message_ext[1] === "nb") {
            //Run Data 
            var new_run = (parseInt(self.match_data[match_id]["run_text"]) + parseInt(message_ext[0]));
            self.data_to_store[match_id]["run"] = new_run || 0;
            self.match_data[match_id]["run_text"] = new_run || 0;
            //Run Data End

            //Six Ball 
            self.glob_ball++;
//            if (message_ext[0] > 1) {
//                var ball_txt = "NB" + "+" + message_ext[0];
//            } else {
//                var ball_txt = "NB";
//            }
            var ball_txt = allMessagesSingular[message_text];
//            if (self.glob_ball <= 6) {
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = ball_txt;
//            } else {
//                self.glob_ball = 0;
//                self.glob_ball++;
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = ball_txt;
//            }
            $("#" + "ball_" + self.glob_ball).val(ball_txt);
            $("#last_ball").val(self.glob_ball);
//            self.balls_array.shift();
//            self.balls_array.push(ball_txt);
//            self.data_to_store[match_id]["last_ball"] = self.glob_ball;
            self.balls_array_count++
//            if (self.balls_array_count <= 6) {
//                self.balls_array.pop();
//                self.balls_array.unshift(ball_txt);
//            } else {
            self.balls_array.shift();
            self.balls_array.push(ball_txt);

            //}
            self.data_to_store[match_id]["last_ball"] = self.glob_ball;
            self.data_to_store[match_id]["balls_array"] = self.balls_array;
            self.data_to_store[match_id]["balls_array_count"] = self.balls_array_count;
            //Six Ball end
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
                $('input[name="strick"]').not(':checked').prop("checked", true);
                over = parseInt(over_ex[0]) + parseInt(1);
            }

            over = parseFloat(over).toFixed(1);
            over = (over === undefined || over === null) ? 0 : over;
            self.data_to_store[match_id]["over"] = over || 0;
            self.match_data[match_id]["over_text"] = over || 0;
            //Over Data End

            //Six Ball 
            self.glob_ball++;
//            if (message_ext[0] > 1) {
//                var ball_txt = "LB" + "+" + message_ext[0];
//            } else {
//                var ball_txt = "LB";
//            }
            var ball_txt = allMessagesSingular[message_text];
//            if (self.glob_ball <= 6) {
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = ball_txt;
//            } else {
//                self.glob_ball = 0;
//                self.glob_ball++;
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = ball_txt;
//            }
            $("#" + "ball_" + self.glob_ball).val(ball_txt);
            $("#last_ball").val(self.glob_ball);
            self.balls_array_count++
//            if (self.balls_array_count <= 6) {
//                self.balls_array.pop();
//                self.balls_array.unshift(ball_txt);
//            } else {
            self.balls_array.shift();
            self.balls_array.push(ball_txt);

            //}
            self.data_to_store[match_id]["last_ball"] = self.glob_ball;
            self.data_to_store[match_id]["balls_array"] = self.balls_array;
            self.data_to_store[match_id]["balls_array_count"] = self.balls_array_count;
            //Six Ball end
            //
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
                $('input[name="strick"]').not(':checked').prop("checked", true);
                over = parseInt(over_ex[0]) + parseInt(1);
            }
            over = parseFloat(over).toFixed(1);
            over = (over === undefined || over === null) ? 0 : over;
            self.data_to_store[match_id]["over"] = over || 0;
            self.match_data[match_id]["over_text"] = over || 0;
            //Over Data End

            //Six Ball 
            self.glob_ball++;
//            if (message_ext[0] > 1) {
//                var ball_txt = "B" + "+" + message_ext[0];
//            } else {
//                var ball_txt = "B";
//            }
            var ball_txt = allMessagesSingular[message_text];
//            if (self.glob_ball <= 6) {
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = ball_txt;
//            } else {
//                self.glob_ball = 0;
//                self.glob_ball++;
//                console.log("self - ball_" + self.glob_ball);
//                self.data_to_store[match_id]["ball_" + self.glob_ball] = ball_txt;
//            }
            $("#" + "ball_" + self.glob_ball).val(ball_txt);
            $("#last_ball").val(self.glob_ball);
            self.balls_array_count++
//            if (self.balls_array_count <= 6) {
//                self.balls_array.pop();
//                self.balls_array.unshift(ball_txt);
//            } else {
            self.balls_array.shift();
            self.balls_array.push(ball_txt);

            //}
            self.data_to_store[match_id]["last_ball"] = self.glob_ball;
            self.data_to_store[match_id]["balls_array"] = self.balls_array;
            self.data_to_store[match_id]["balls_array_count"] = self.balls_array_count;
            //Six Ball end

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
    console.log("============= ball array =============");
    console.log(self.balls_array);
    $("#balls_array_count").val(balls_array_count);
    for (var i = 0; i < (self.balls_array_count <= 6 ? self.balls_array_count : 6); i++) {
        var z = parseInt(i) + parseInt(1);
        $("#ball_" + z).val(self.balls_array[i]);
        console.log(self.balls_array[i]);
    }
    console.log("============= ball array end =============");


    self.data_to_store[match_id]["message"] = allMessages[message_text];
    self.data_to_store[match_id]["message_key"] = message_text;
    self.data_to_store[match_id]["match_id"] = match_id;
    var strick1 = $("input[name='strick']:checked").val() ? $("input[name='strick']:checked").val() : "";
    self.data_to_store[match_id]["strick"] = strick1;

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
        if (key != 'match_id') {
            data_to_store_obj[key] = self.data_to_store[match_id][key];
        }
    }
    data_to_store_obj["other_team_name"] = $("#other_team_name").val();
    data_to_store_obj["other_team_id"] = $("#other_team_id").val();
    data_to_store_obj["other_team_score"] = $("#other_team_score").val();
    data_to_store_obj["other_team_wicket"] = $("#other_team_wicket").val();
    data_to_store_obj["other_team_overs"] = $("#other_team_overs").val();
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
    $('#message_select4').prop('selectedIndex', 0);
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


    //Set strick val
//    var strick = $("input[name='strick']:checked").val() ? $("input[name='strick']:checked").val() : "";
//
//    if (strick == 'strick_1') {
//       var batsman_strick = "batsman_1";
//    } else {
//       var batsman_strick = "batsman_2";
//    }
//
//    var batsman_strick_value = $("#" + batsman_strick + "_text").val();
//    var bat_val = batsman_strick_value + " *";
//    self.match_data[match_id][batsman_strick + "_text"] = bat_val;
    //End strick val
    var ball_n_array = ["ball_1", "ball_2", "ball_3", "ball_4", "ball_5", "ball_6"];
    if (ball_n_array.indexOf(filed_name) >= 0) {
        var ball_1 = $("#ball_1").val();
        var ball_2 = $("#ball_2").val();
        var ball_3 = $("#ball_3").val();
        var ball_4 = $("#ball_4").val();
        var ball_5 = $("#ball_5").val();
        var ball_6 = $("#ball_6").val();
        data_to_store_one["balls_array"] = [ball_1, ball_2, ball_3, ball_4, ball_5, ball_6];
    } else {
        data_to_store_one[filed_name] = filed_value;
    }
    //data_to_store_one["match_id"] = match_id;
    console.log("=================== data to store one ==============");
    console.log(data_to_store_one);
    console.log("=================== data to store one end==============");

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
        if (key != 'match_id')
            data_to_store_obj[key] = data_to_store_one[key];
    }
    data_to_store_obj["other_team_name"] = $("#other_team_name").val();
    data_to_store_obj["other_team_id"] = $("#other_team_id").val();
    data_to_store_obj["other_team_score"] = $("#other_team_score").val();
    data_to_store_obj["other_team_wicket"] = $("#other_team_wicket").val();
    data_to_store_obj["other_team_overs"] = $("#other_team_overs").val();
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
    //data_to_store_one["match_id"] = match_id;

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
        if (key != 'match_id')
            data_to_store_obj[key] = data_to_store_one[key];
    }
    data_to_store_obj["other_team_name"] = $("#other_team_name").val();
    data_to_store_obj["other_team_id"] = $("#other_team_id").val();
    data_to_store_obj["other_team_score"] = $("#other_team_score").val();
    data_to_store_obj["other_team_wicket"] = $("#other_team_wicket").val();
    data_to_store_obj["other_team_overs"] = $("#other_team_overs").val();
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
    //data_to_store_one["match_key"] = match_id;

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
        if (key != 'match_key')
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
    var filed_name = sel.name;
    var filed_value = sel.value;
    var match_id = $("#match_id").val();

    if (filed_name == 'market_rate') {
        //field_values
        var filed_name_1 = "market_rate_1";
        var filed_name_2 = "market_rate_2";
        var field_values = filed_value.split("-");
    }
//    if (filed_name == 'session') {
//        var filed_name_1 = "session_1";
//        var filed_name_2 = "session_2";
//
//    }

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

//    var filed_name = sel.name;
//    var filed_value = sel.value;
//    var match_id = $("#match_id").val();
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

        var filed_name_1 = "session_1";
        var filed_name_2 = "session_2";
        var filed_value_1 = $("#session_1").val();
        var filed_value_2 = $("#session_2").val();
    }

    if (filed_name_1 == 'market_rate_1') {
        var filed_value_1 = field_values[0]
        var filed_value_2 = field_values[1]
    }

//    if (filed_name == "session_1") {
//
//    }

//    var over = $("#over").val();
    var numbe_eleven = ($('#numbe_eleven').is(':checked')) ? "1" : "0";

    data_to_store_one[filed_name_1] = filed_value_1;
    data_to_store_one[filed_name_2] = filed_value_2;
    data_to_store_one["numbe_eleven"] = numbe_eleven;
    console.log(data_to_store_one);
    //data_to_store_one["match_key"] = match_id;

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
        if (key != 'match_key')
            data_to_store_obj[key] = data_to_store_one[key];
    }

    var data = {'match_id': match_id,
        session_data: session_data_obj,
        data_to_store: data_to_store_obj};
    console.log(data);
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
