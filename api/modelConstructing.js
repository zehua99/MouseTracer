var express = require('express');
var router = express.Router();
var Redis = require('ioredis');
var preCheck = require('./calculate/preliminaryCheck');

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

router.get('/constructModel', function(req, res, next) {
    
});

module.exports = router;