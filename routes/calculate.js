module.exports = function(data){
    if(data[1] == null)
        return 1;
    // 把空着的毫秒数都填上来
    var n = 0, time = 0, traceArray = [];
    while(data[n] != null){
        for(var t = 0; t < (data[n+1].timer - data[n].timer); t++){
            traceArray[time] = {
                "x": data[n].x,
                "y": data[n].y
            };
            time++;
        }
    }
    console.log(traceArray);
    var euclideanStep = [], angleStep = [], possibilityOfES = [], possibilityOfAS = [];
    var stdDeviationOfES = 0, stdDeviationOfAS = 0, sigmaPossibility = Math.log(1), sqrt2Pi = Math.sqrt(2 * Math.PI);
    for(var t = 0; t < traceArray.length - 1; t++){
        euclideanStep[t] = Math.sqrt((traceArray[t+1].x - traceArray[t].x) ^ 2 + (traceArray[t+1].y - traceArray[t].y) ^ 2);
        angleStep[t] = Math.atan((traceArray[t+1].y - traceArray[t].y) / (traceArray[t+1].x - traceArray[t].x));
        stdDeviationOfES += euclideanStep[t] ^ 2;
        stdDeviationOfAS += angleStep[t] ^ 2;
    }
    stdDeviationOfES = stdDeviationOfES / (traceArray.length - 1);
    stdDeviationOfAS = stdDeviationOfAS / (traceArray.length - 1);
    for(var t = 0; t < traceArray.length - 2; t++){
        possibilityOfES[t] = (1 / (sqrt2Pi * stdDeviationOfES)) * Math.exp(-((euclideanStep[t+1] - euclideanStep[t]) ^ 2 / (2 * stdDeviationOfES ^ 2)));
        possibilityOfAS[t] = (1 / (sqrt2Pi * stdDeviationOfAS)) * Math.exp(-((angleStep[t+1] - angleStep[t]) ^ 2 / (2 * stdDeviationOfAS ^ 2)));
        sigmaPossibility += Math.log(possibilityOfES[t] + possibilityOfAS[t]);
    }
    console.log(sigmaPossibility);
    return sigmaPossibility;
}   