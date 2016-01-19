module.exports = function(traceArray){
    if(traceArray[1] == null)
        return 1;
    var euclideanStep = 0, angleStep = 0;
    for(t = 1; t < traceArray.length; t++) {
        lstEuclideanStep = euclideanStep;
        lstAngleStep = angleStep;
        euclideanStep = (traceArray[t - 1].x - traceArray[t].x) ^ 2 + (traceArray[t - 1].y - traceArray[t].y) ^ 2;
        angleStep = Math.atan((traceArray[t - 1].y - traceArray[t].y) / (traceArray[t - 1].x - traceArray[t].x));
        if(t != 1) {
            
        }
    }
    return t;
}