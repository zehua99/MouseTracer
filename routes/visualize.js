var express = require('express');
var router = express.Router();
var Redis = require('ioredis');

router.get('/visualize', function(req, res, next) {
  res.render('visualize', { title: '可视化轨迹观察页面' });
});

module.exports = router;