const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.is_connected) {
    res.render('dashboard', {
      user_mail: req.session.user_email_connected
    });
  } else {
    res.render('index', {
      title: 'Nicolas Super Dashboard',
      title_sub: 'One man Army production'
    });
  }
});

module.exports = router;
