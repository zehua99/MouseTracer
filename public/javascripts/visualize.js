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
                for(let n = 0; n < periodSet[i].length; n++){
                    var ctxt = canvas.getContext("2d");
                    ctxt.strokeStyle = "#" + i.toString(16) + i.toString(16) + i.toString(16);
                    if(n == 0)
                        ctxt.moveTo(periodSet[i][n][0], periodSet[i][n][1]);
                    if(n > 0){
                        ctxt.lineTo(periodSet[i][n][0], periodSet[i][n][1]);
                    }
                    ctxt.stroke();
                }
            }
        }
    });
}
