var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
        user_mail: req.session.user_email_connected
    });
});

module.exports = router;
