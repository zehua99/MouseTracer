"use strict";

module.exports = function(sentTrace, ip, redis, callback){
    var getDissimilarity = require('./getDissimilarity');
    var dissimilarity = [], temp = 0;
    redis.hgetall("client_ip:" + ip, function(err, value){
        if(!value.counter)
            callback(err, dissimilarity);
        if(value.counter > 10){
            var time = 10;
            temp = 1;
        } else
            var time = value.counter;
        for(let i = 0; i < time; i++){
            let t;
            if(temp == 1)
                t = value.counter - i - 1;
            else 
                t = i;
            console.log(time, t);
            redis.hget(value["key:" + t], "details", function(err, values) {
                var details = JSON.parse(values);
                if(details.length > 5)
                    dissimilarity[i] = getDissimilarity(sentTrace, details);   // sentTrace 也为 details
                else {
                    dissimilarity[i] = -100;
                    console.log(details, t);
                }
                if(i == (time - 1))
                    callback(err, Math.max.apply(null, dissimilarity));
            });
        }
    });
}