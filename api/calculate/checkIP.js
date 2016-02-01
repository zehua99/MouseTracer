"use strict";

module.exports = function(sentTrace, ip, redis, callback){
    var getDissimilarity = require('./getDissimilarity');
    var dissimilarity = [];
    redis.hgetall("client_ip:" + ip, function(err, value){
        if(!value.counter)
            callback(err, dissimilarity);
        for(let t = 0; t < value.counter; t++){
            redis.hget(value["key:" + t], "details", function(err, values) {
                var details = JSON.parse(values);
                // console.log(details);
                dissimilarity[t] = getDissimilarity(sentTrace, details);   // sentTrace 也为 details
                if(t == (value.counter - 1))
                    callback(err, dissimilarity);
            });
        }
    });
}