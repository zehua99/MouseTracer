var express = require('express');
var router = express.Router();
var redis = require('node-redis');
var async = require('async');
var calculate = require('./calculate')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/verify',function(req, res, next) {
  var redis = redis.createredis();
  redis.get("counter", function(err, counter) {
      if (err) throw(err);
      key = "trace:" + counter;
      async.parallel([
          function(){
              redis.hset(key, "trace", JSON.stringify(req.body.traceArray));
          },
          function(){
              redis.hset(key, "ip", req.ip);
          },
          function(){
              redis.hset(key, "timestamp", Date.now());
          },
          function(){
              redis.incr("counter");
          }
      ], function(){
          res.send(JSON.stringify(req.body)).end();
      });
   });
});

router.post('/a', function(req, res, next) {
  res.send(req.body.width.toString()).end();
});

module.exports = router;