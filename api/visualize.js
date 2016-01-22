"use strict";

var express = require('express');
var router = express.Router();
var Redis = require('ioredis');

router.post('/moment', function(req, res, next) {
    // 要被这些timer, i, count搞疯了……
    var requestMoment = req.body.moment;
    var pointSet = [], count = 0;
    var point = [];
    var redis = new Redis();
    redis.get("counter", function(err, counter) {
        for(let i = 0; i < counter; i++){
            redis.hget("trace:" + i, "trace", function(err, value){
                var trace = JSON.parse(value);
                // console.log(trace);
                console.log(i);
                var n = trace.length - 1;
                if (trace[n].time < requestMoment)
                    n = -1;
                while(n > -1){
                    if(trace[n].time <= requestMoment){
                        point[0] = trace[n].x;
                        point[1] = trace[n].y;
                        pointSet[count++] = point;
                        n = -1;
                    }
                    n--;
                }
                if(i == counter - 1){
                    console.log(pointSet);
                    res.send(JSON.stringify(pointSet)).end();
                }
            });
        }
    });
});

module.exports = router;