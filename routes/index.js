const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  const cookieOptions = {
    maxAge : 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true,
  }
  res.cookie('cookie_name3', "cookie_value3", cookieOptions);

  if (req.session.is_connected) {
    res.render('dashboard', {
      user_mail: req.session.user_email_connected
    });
  } else {
    res.redirect('connection');
  }
});

module.exports = router;
