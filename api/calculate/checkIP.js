module.exports = function(ip, redis){
    var getDissimilarity = require('./calculate/getDissimilarity');
    redis.hgetall("client_ip:" + ip, function(err, value){
        if(!value.counter)
            return 0;
        for(var t = 0; t < value.counter; t++){
            redis.hget(value["key:" + t], "details", function(err, value) {
                var details = JSON.parse(value);
                console.log(getDissimilarity());
            });
        }
    });
}