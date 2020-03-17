const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.session.is_connected) {
    res.render('dashboard', {
      user_mail: req.session.user_email_connected
    });
  } else {
    res.redirect('connection');
  }
});

module.exports = router;
