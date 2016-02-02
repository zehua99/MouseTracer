module.exports = function(euclideanStep, traceArray){
    var angleStep = [], possibilityOfES = [], possibilityOfAS = [];
    var stdDeviationOfES = 0, stdDeviationOfAS = 0, sumOfES = 0, sumOfAS = 0;
    for(var t = 0; t < traceArray.length - 1; t++){
        angleStep[t] = Math.atan((traceArray[t+1].y - traceArray[t].y) / (traceArray[t+1].x - traceArray[t].x));
        if(!angleStep[t])
            angleStep[t] = 0;
        sumOfES += euclideanStep[t];
        sumOfAS += angleStep[t];
    }
    for(var t = 0; t < traceArray.length - 1; t++){
        stdDeviationOfES += Math.pow((euclideanStep[t] - (sumOfES / (traceArray.length - 1))), 2);
        stdDeviationOfAS += Math.pow((angleStep[t] - (sumOfAS / (traceArray.length - 1))), 2);
    }
    // console.log("stdDoES:" + stdDeviationOfES, "stdDoAS:" + stdDeviationOfAS);
    var callbackData = [euclideanStep, angleStep, stdDeviationOfES, stdDeviationOfAS, sumOfES, sumOfAS, traceArray[traceArray.length - 1].time - 1];
    return callbackData;
} 