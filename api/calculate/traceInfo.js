module.exports = function(euclideanStep, traceArray){
    var angleStep = [], possibilityOfES = [], possibilityOfAS = [];
    var stdDeviationOfES = 0, stdDeviationOfAS = 0, sigmaPossibility = Math.log(1), sqrt2Pi = Math.sqrt(2 * Math.PI);
    for(var t = 0; t < traceArray.length - 1; t++){
        angleStep[t] = Math.atan((traceArray[t+1].y - traceArray[t].y) / (traceArray[t+1].x - traceArray[t].x));
        if(!angleStep[t])
            angleStep[t] = 0;
        stdDeviationOfES += euclideanStep[t] ^ 2;
        stdDeviationOfAS += angleStep[t] ^ 2;
    }
    stdDeviationOfES = stdDeviationOfES / (traceArray[traceArray.length - 1].time - 1);
    stdDeviationOfAS = stdDeviationOfAS / (traceArray[traceArray.length - 1].time - 1);
    var callbackData = [0, angleStep, stdDeviationOfES, stdDeviationOfAS, traceArray[traceArray.length - 1].time - 1];
    return callbackData;
}