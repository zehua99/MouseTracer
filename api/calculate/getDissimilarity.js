// callbackData = [ES, AS, ES标准差, AS标准差, ES总和, AS总和, 总时长];

module.exports = function(trace1, trace2){
    var sigmaPossibilityOfBoth = Math.log(Math.pow(10, 8)), sqrt2Pi = Math.sqrt(2 * Math.PI);
    var sigmaPossibility1 = Math.log(Math.pow(10, 8)), sigmaPossibility2 = Math.log(Math.pow(10, 8));
    var stdDeviationOfESOfBoth = 0;
    var stdDeviationOfASOfBoth = 0;
    var averageES = (trace1[4] + trace2[4]) / (trace1[6] + trace2[6]);
    var averageAS = (trace1[5] + trace2[5]) / (trace1[6] + trace2[6]); 
    
    for(var i = 0; i < trace1[0].length; i++){
        stdDeviationOfESOfBoth += Math.pow((trace1[0][i] - averageES), 2);
        stdDeviationOfASOfBoth += Math.pow((trace1[1][i] - averageAS), 2);
    }
    for(var i = 0; i < trace2[0].length; i++){
        stdDeviationOfESOfBoth += Math.pow((trace2[0][i] - averageES), 2);
        stdDeviationOfASOfBoth += Math.pow((trace2[1][i] - averageAS), 2);
    }
    stdDeviationOfESOfBoth /= trace1[6] + trace2[6];
    stdDeviationOfASOfBoth /= trace1[6] + trace2[6];
    
    for(var i = 0; i < trace1[0].length; i++){
        sigmaPossibility1 = sigmaPossibility(trace1, (trace2[2] / trace2[6]), (trace2[3] / trace2[6]), sigmaPossibility1);
        sigmaPossibilityOfBoth = sigmaPossibility(trace1, stdDeviationOfESOfBoth, stdDeviationOfASOfBoth, sigmaPossibilityOfBoth);
    }
    for(var i = 0; i < trace2[0].length; i++){
        sigmaPossibility2 = sigmaPossibility(trace2, (trace1[2] / trace1[6]), (trace1[3] / trace1[6]), sigmaPossibility2);
        sigmaPossibilityOfBoth = sigmaPossibility(trace2, stdDeviationOfESOfBoth, stdDeviationOfASOfBoth, sigmaPossibilityOfBoth);
    }
    
    return ((sigmaPossibility1 + sigmaPossibility2) / sigmaPossibilityOfBoth);
    
    function sigmaPossibility(trace, stdDeviationOfES, stdDeviationOfAS, sigmaPossibility){
        var possibilityOfES = (1 / (sqrt2Pi * stdDeviationOfES)) * Math.exp(-(Math.pow((trace[0][i]), 2)) / (2 * Math.pow(10000 * stdDeviationOfES, 2)));
        var possibilityOfAS = (1 / (sqrt2Pi * stdDeviationOfAS)) * Math.exp(-(Math.pow((trace[1][i]), 2)) / (2 * Math.pow(10000 * stdDeviationOfAS, 2)));
        sigmaPossibility += Math.log(possibilityOfES * possibilityOfAS); 
        sigmaPossibility += (trace[6] - trace[0].length) * Math.log(1 / (2 * Math.PI * stdDeviationOfES * stdDeviationOfAS));
        return sigmaPossibility;
    }
}