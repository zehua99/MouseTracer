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
