var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Nicolas Super Dashboard',
    title_sub: 'One man Army production'
  });
});

module.exports = router;
