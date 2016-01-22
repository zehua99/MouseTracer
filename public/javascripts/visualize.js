"use strict";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawMoment(){
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 256, 256);
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
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "rgb(100, 100, 100)";
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
            for(var i = 0; i < periodSet.length; i++){
                for(var n = 0; n < periodSet[i].length; n++){
                    let ctxt = canvas.getContext("2d");
                    ctxt.strokeStyle = "#" + i.toString(16) + i.toString(16) + i.toString(16);
                    if(n == 0)
                        ctxt.moveTo(periodSet[i][n][0], periodSet[i][n][1]);
                    if(n > 0){
                        ctxt.lineTo(periodSet[i][n][0], periodSet[i][n][1]);
                    }
                    ctxt.fill();
                    ctxt.stroke();
                    console.log(i, n);
                }
            }
        }
    });
}
