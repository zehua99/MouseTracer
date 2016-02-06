"use strict";

var express = require('express');
var router = express.Router();
var Redis = require('ioredis');
var getDissimilarity = require('./calculate/getDissimilarity');

router.post('/addCredibleTraces', function(req, res, next) {
    var redis = new Redis();
    redis.hget(req.body.trace, "details", function(err, value) {
        if(!value) {
            res.send("没有这条轨迹");
        } else {
            redis.rpush("credible_trace", req.body.trace, function(err, value) {
                res.send("添加成功");
            });
        }
    });
});

router.get('/construct', function(req, res, next) {
    var redis = new Redis();
    var u = 0, theta2 = 0;
    redis.llen("credible_trace_to_be_tested", function(err, count1) {
        redis.lrange("credible_trace_to_be_tested", 0, count1 - 1, function(err, set1) {
            redis.llen("credible_trace", function(err, count2) {
                redis.lrange("credible_trace", 0, count2 - 1, function(err, set2){
                    var dissimilarityArray = [];
                    for(let i = 0; i < count1; i++){
                        redis.hget(set1[i], "details", function(err, detail1){
                            let dissimilarityArrayOfOne = [];
                            for(let t = 0; t < count2; t++){
                                redis.hget(set2[t], "details", function(err, detail2){
                                    dissimilarityArrayOfOne[t] = getDissimilarity(JSON.parse(detail1), JSON.parse(detail2));
                                    if(t == count2 - 1){
                                        dissimilarityArray[i] = Math.max.apply(null, dissimilarityArrayOfOne);
                                        u += dissimilarityArray[i]
                                    }
                                    if(i == count1 - 1 && t == count2 - 1){
                                        u /= count1;
                                        for(var n = 0; n < count1; n++){
                                            theta2 += (1 / count1) * Math.pow(dissimilarityArray[i] - u, 2);
                                        }
                                        var pipeline = redis.pipeline();
                                        pipeline.set("u", u).set("theta2", theta2);
                                        pipeline.exec(function(err, values){
                                            res.send(u + " and " + theta2);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
    });
});

router.post("/add", function(req, res, next) {
    var redis = new Redis();
    var pipeline = redis.pipeline();
    var pipeline_1 = redis.pipeline();
    for(let i = 0; i < req.body.set.length; i++){
        pipeline.hget(req.body.set[i], "details", function(err, value){
            if(value)
                pipeline_1.rpush("credible_trace", req.body.set[i]);
        });
    }
    pipeline.exec(function(err, values){
        pipeline_1.exec(function(err, values){
            res.send(values);
        });
    });
});

router.post("/add/test", function(req, res, next) {
    var redis = new Redis();
    var pipeline = redis.pipeline();
    var pipeline_1 = redis.pipeline();
    for(let i = 0; i < req.body.set.length; i++){
        pipeline.hget(req.body.set[i], "details", function(err, value){
            if(value)
                pipeline_1.rpush("credible_trace_to_be_tested", req.body.set[i]);
        });
    }
    pipeline.exec(function(err, values){
        pipeline_1.exec(function(err, values){
            res.send(values);
        });
    });
});

module.exports = router;