module.exports = function(traceArray){
    if(traceArray[1] == null)
        return 1;
    var euclideanStep = [], angleStep = [], possibilityOfES = [], possibilityOfAS = [];
    var stdDeviationOfES = 0, stdDeviationOfAS = 0, sigmaPossibility = Math.log(1), sqrt2Pi = Math.sqrt(2 * Math.PI);
    for(var t = 0; t < traceArray.length - 1; t++){
        euclideanStep[t] = Math.sqrt((traceArray[t+1].x - traceArray[t].x) ^ 2 + (traceArray[t+1].y - traceArray[t].y) ^ 2);
        angleStep[t] = Math.atan((traceArray[t+1].y - traceArray[t].y) / (traceArray[t+1].x - traceArray[t].x));
        stdDeviationOfES += euclideanStep[t] ^ 2;
        stdDeviationOfAS += angleStep[t] ^ 2;
    }
    stdDeviationOfES = stdDeviationOfES / (traceArray[traceArray.length - 1].time - 1);
    stdDeviationOfAS = stdDeviationOfAS / (traceArray[traceArray.length - 1].time - 1);
    console.log(traceArray[traceArray.length - 1].time);
    for(var t = 0; t < traceArray.length - 2; t++){
        possibilityOfES[t] = (1 / (sqrt2Pi * stdDeviationOfES)) * Math.exp(-((euclideanStep[t+1] - euclideanStep[t]) ^ 2 / (2 * stdDeviationOfES ^ 2)));
        possibilityOfAS[t] = (1 / (sqrt2Pi * stdDeviationOfAS)) * Math.exp(-((angleStep[t+1] - angleStep[t]) ^ 2 / (2 * stdDeviationOfAS ^ 2)));
        sigmaPossibility += Math.log(possibilityOfES[t] + possibilityOfAS[t]);
        sigmaPossibility += (traceArray[traceArray.length - 1].time - traceArray.length - 1) * Math.log(1 / (2 * Math.PI * stdDeviationOfES * stdDeviationOfAS));
    }
    sigmaPossibility *= -1;
    console.log(sigmaPossibility);
    console.log(traceArray);
    return sigmaPossibility;
}