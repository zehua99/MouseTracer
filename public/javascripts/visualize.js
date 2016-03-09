"use strict";

var canvas = document.getElementById("canvas");

function drawMoment(){
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,256,256);
    var json = {
        "moment": $("#moment").val()
    };
    $.ajax({
        url: "/visualize/moment",
        type: 'POST',
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(json), 
        success: function(callbackData) {
            var pointSet = JSON.parse(callbackData);
            for(var i = 0; i < pointSet.length; i++){
                ctx.fillStyle = "rgb(100, 100, 100)";
                ctx.fillRect(pointSet[i][0], pointSet[i][1], 1, 1);
            }
        }
    });
}

function drawPeriod(){
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,256,256);
    var json = {
        "start": $("#start").val(),
        "stop": $("#stop").val()
    };
    $.ajax({
        url: "/visualize/period",
        type: 'POST',
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(json), 
        success: function(callbackData) {
            var periodSet = JSON.parse(callbackData);
            console.log(periodSet);
            for(let i = 0; i < periodSet.length; i++){
                ctx.beginPath()
                for(let n = 0; n < periodSet[i].length; n++){
                    ctx.strokeStyle = "#" + i.toString(16) + i.toString(16) + i.toString(16);
                    if(n == 0)
                        ctx.moveTo(periodSet[i][n][0], periodSet[i][n][1]);
                    if(n > 0){
                        ctx.lineTo(periodSet[i][n][0], periodSet[i][n][1]);
                    }
                    ctx.stroke();
                }
            }
        }
    });
}

function drawVelocity(){
    canvas = document.getElementById("velocity");
    var json = {
        "traceId": $("#velocity_id").val()
    };
    $.ajax({
        url: "/visualize/velocity",
        type: 'POST',
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(json), 
        success: function(callbackData) {
            var dataSet = JSON.parse(callbackData);
            var axisX = [], axisY = []
            for(var i = 0; i < dataSet.length; i++){
                axisX[i] = (dataSet[i][1] + dataSet[i][2]) / 2;
                axisY[i] = dataSet[i][0];
            }
            Plotly.plot( canvas, [{
            x: axisX,
            y: axisY }], { 
            margin: { t: 0 } } );
        }
    });
}

function drawTrace(){
    var ctx = canvas.getContext("2d");
    var json = {
        "traceId": $("#trace_id").val()
    };
    $.ajax({
        url: "/visualize/trace",
        type: 'POST',
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(json), 
        success: function(callbackData) {
            var pointSet = JSON.parse(callbackData);
            for(var i = 0; i < pointSet.length; i++){
                ctx.strokeStyle = "#" + i.toString(16) + i.toString(16) + i.toString(16);
                if(i == 0)
                    ctx.moveTo(pointSet[i].x, pointSet[i].y);
                if(i > 0)
                    ctx.lineTo(pointSet[i].x, pointSet[i].y);
            }
            ctx.stroke();
        }
    });
}