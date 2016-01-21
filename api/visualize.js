var express = require('express');
var router = express.Router();
var Redis = require('ioredis');

router.get('/', function(req, res, next) {
  res.sendFile('/public/visualize.html');
});

module.exports = router;