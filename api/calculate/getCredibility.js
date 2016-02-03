"use strict";

module.exports= function(details, redis, callback){
    var getDissimilarity = require('./getDissimilarity');
    redis.llen("credible_trace", function(err, length){
        redis.lrange("credible_trace", 0, length - 1, function(err, traces){
            var dissimilaritySet = [];
            for(let i = 0; i < length; i++){
                redis.hget(traces[i], "details", function(err, value){
                    dissimilaritySet[i] = getDissimilarity(details, JSON.parse(value));
                    if(i == length - 1){
                        var pipeline = redis.pipeline();
                        pipeline.get("u").get("theta2").exec(function(err, values){
                            var dissimilarity = Math.max.apply(null, dissimilaritySet);
                            var credibility = (1 / Math.sqrt(2 * Math.PI * values[1][1])) * Math.exp(-(Math.pow((dissimilarity - values[0][1]), 2)) / (2 * values[1][1]));
                            callback(credibility);
                        });
                    }
                });
            }
        });
    });
}