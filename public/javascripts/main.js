    var traceArray = [];
    var count = 0, checkboxVal = 0, fade = "out", timer = 0, width = 256, height = 256, x, y;
    
    $(document).ready(function(){
        $("#checkbox").click(function(){
            if(checkboxVal == 0){
                detectMouseMove();
                checkboxVal = 1;
                console.log(checkboxVal);
            }else{
                checkboxVal = 0;
                $("#tooltip-box").fadeIn(300, function(){
                    fade = "in";
                    setTimeout(function(){
                        if(fade == "in")
                            $("#tooltip-box").fadeOut(300);
                    }, 1000);
                });
            }
        });
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
        if(count == 0)
            setInterval("timer++", 1);
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