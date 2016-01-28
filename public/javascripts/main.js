var traceArray = [];
var count = 0, checkboxVal = 0, fade = "out", fadeUid = 0;
var sent = 0, timer = 0, width = 256, height = 256, x, y;

$(document).ready(function(){
    if(isMobile.any){
        $("#verification_button").remove();
        $("#verification_checkbox").empty();
        $("#verification_checkbox").prepend("<p>手机用户不能用噢</p>");
    }
    $("#tooltip-box").fadeOut(0);
    $("#checkbox").click(function(){
        if(checkboxVal == 0){
            detectMouseMove();
            checkboxVal = 1;
        }else{
            checkboxVal = 0;
            $("#tooltip").html('你难道是机器人!?');
            fadeIO("in", "#tooltip-box");
            sent = 0;
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
    if(sent == 1){
        $("#tooltip").html('如果能再多重复几次你之前的操作就再好不过了');
        fadeIO("in", "#tooltip-box");
    } else {
        if(checkboxVal == 1 && !isMobile.any){
            sent = 1;
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
                    $("#tooltip").html('验证数据已发送! 请多验证几次吧(什么');
                    fadeIO("in", "#tooltip-box");
                }
            });
        } else {
            $("#tooltip").html('喊了"芝麻开门"我才开门!');
            fadeIO("in", "#tooltip-box");
        }
    }
}

function fadeIO(io, id){
    if(io == "in"){
        $(id).fadeIn(300, function(){
            fade = "in";
            (function(){
                var myFadeUid = ++fadeUid;
                setTimeout(function(){
                    if(fade == "in" && myFadeUid == fadeUid){
                        $(id).fadeOut(300);
                        fade = "out";
                    }
                }, 1500);
            })();
        });
    } else {
        $(id).fadeOut(300, function(){
            fade = "out";
            (function(){
                var myFadeUid = ++fadeUid;
                setTimeout(function(){
                    if(fade == "out" && myFadeUid == fadeUid){
                        $(id).fadeIn(300);
                        fade = "in";
                    }
                }, 1500);
            })();
        });
    }
}