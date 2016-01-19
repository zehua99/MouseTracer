    var traceArray = {};
    var count = 0, timer = 0, width = 300, height = 80, x, y;
    var origDiv = document.getElementById("orig");	

    $(document).ready(function(){
        $("#orig").after("<input type='button' value='I'm not a robot' onclick='detectMouseMove()' style='position: absolute; z-index:100; left: 0px; top: 0px'>");
        $("#orig").after("<div id='radar' style='background:green; width: " + width + "px; height: " + height + "px; position: absolute; top: 0px; left: 0px'>");
        $("#orig").after("<input type='button' value='Submit' onclick='sendTraceArray()' style='position: absolute; z-index:100; left: " + width * 5 / 8 + "px; top: " + (height * 5 / 8) + "px'>");
    });

    function detectMouseMove(){
        traceArray = [];
        count = 0, timer = 0;
        $('#radar').mousemove(function(e) {  
            var xMouse=e.pageX;
            var yMouse=e.pageY;
            var id = (count - 1);
            if(count != 0){
                if(xMouse != traceArray[id]['0'] || yMouse != traceArray[id]['1'])
                    saveTrace(xMouse, yMouse);
            } else {
                saveTrace(xMouse, yMouse);
            }
        });
    }

    function saveTrace(x, y) {
        if(count == 0)	setInterval("timer++", 1);
        if(count % 20 == 0)	console.log(traceArray);
        var id = count++;
        traceArray[id] = {
            "x": x,
            "y": y,
            "time": timer
        };
    }

    function sendTraceArray() {
        var allData = new Object();
        allData.traceArray = traceArray;
        allData.width = width;
        allData.height = height;
        $.ajax({
            url: "/verify",
            type: 'POST',
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(allData), 
            success: function(callBackData) {
                console.log(callBackData);
            }
        });
    }