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
    var ctx = new FlatSystem(canvas.getContext('2d'), 2048, 1024);
    ctx.init();
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
            for(var i = 0; i < dataSet.length; i++){
                if(i == 0)
                    ctx.printLine(dataSet[i][2] * 2, dataSet[i][0] * 500, 0, 0);
                else
                    ctx.printLine(dataSet[i][2] * 2, dataSet[i][0] * 500, dataSet[i][1] * 2, dataSet[i-1][0] * 500);
            }
        }
    });
}