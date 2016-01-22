var express = require('express');
var router = express.Router();
var Redis = require('ioredis');

router.post('/moment', function(req, res, next) {
    var requestMoment = req.body.moment;
    var pointSet = [], count = 0, timer = 0;
    var point = [];
    var redis = new Redis();
    redis.get("counter", function(err, counter) {
        for(var i = 0; i < counter; i++){
            redis.hget("trace:" + i, "trace", function(err, value){
                var trace = JSON.parse(value);
                var n = trace.length - 1;
                if (trace[n].time < requestMoment)
                    n = -1;
                while(n > -1){
                    if(trace[n].time <= requestMoment){
                        point['x'] = trace[n].x;
                        point['y'] = trace[n].y;
                        pointSet[count++] = point;
                        n = -1;
                    }
                    n--;
                }
                timer++;
                if(timer == counter){
                    console.log(pointSet);
                    res.send(JSON.stringify(pointSet)).end();
                }
            });
        }
    });
});

module.exports = router;