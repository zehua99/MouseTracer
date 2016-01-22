"use strict";

var express = require('express');
var router = express.Router();
var Redis = require('ioredis');

router.post('/moment', function(req, res, next) {
    var requestMoment = req.body.moment;
    var pointSet = [], count = 0;
    var redis = new Redis();
    redis.get("counter", function(err, counter) {
        for(let i = 0; i < counter; i++){
            redis.hget("trace:" + i, "trace", function(err, value){
                let trace = JSON.parse(value);
                let n = trace.length - 1;
                if (trace[n].time < requestMoment)
                    n = -1;
                while(n > -1){
                    if(trace[n].time <= requestMoment){
                        let point = [];
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

router.post('/period', function(req, res, next) {
    var start = req.body.start;
    var stop = req.body.stop;
    console.log(req.body);
    var periodSet = [];
    var redis = new Redis();
    redis.get("counter", function(err, counter) {
        for(let i = 0; i < counter; i++){
            redis.hget("trace:" + i, "trace", function(err, value){
                let trace = JSON.parse(value);
                let n = trace.length - 1;
                let temp = 0;
                let traceStart = 0, traceStop = 0;
                if(trace[n].time < start)
                    n = -1;
                while(n > -1){
                    if(trace[n].time <= stop && temp == 0){
                        traceStop = n;
                        temp = 1;
                    }
                    if(trace[n].time <= start){
                        traceStart = n;
                        n = -1;
                    }
                    n--;
                }
                let tempSet = [];
                for(let p = 0; p < traceStop - traceStart; p++){
                    let tempPoint = [];
                    tempPoint[0] = trace[p + traceStart].x;
                    tempPoint[1] = trace[p + traceStart].y;
                    tempSet[p] = tempPoint;
                    console.log(tempPoint);
                }
                periodSet[i] = tempSet;
                if(i == counter - 1){
                    res.send(JSON.stringify(periodSet));
                }
            });
        }
    });
});

module.exports = router;