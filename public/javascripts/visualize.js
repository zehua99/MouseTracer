var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawMoment(){
    var json = {
        "moment": $("#moment").val()
    };
    $.ajax({
        url: "/visualize/moment",
        type: 'POST',
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(json), 
        success: function(pointSet) {
            console.log(pointSet);
            for(var i = 0; i < pointSet.length; i++){
                ctx.fillStyle = "rgb(100, 100, 100)";
                console.log(pointSet[i][0]);
                ctx.fillRect(pointSet[i][0], pointSet[i][1], pointSet[i][0], pointSet[i][1]);
            }
        }
    });
}
