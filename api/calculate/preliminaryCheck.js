module.exports = function(traceArray, width, height){
    var euclideanStep = [];
    if(traceArray[1] == null || traceArray[0].time > 2)
        return 0;
    for(var t = 1; t < traceArray.length - 1; t++){
        euclideanStep[t] = Math.sqrt((traceArray[t+1].x - traceArray[t].x) ^ 2 + (traceArray[t+1].y - traceArray[t].y) ^ 2);
        if(euclideanStep[t] > 5 || traceArray[t].x <= 2 || traceArray[t].x >= (width - 2) || traceArray[t].y <= 2 || traceArray[t].y >= (height - 2))
            return 0;
    }
    return euclideanStep;
}