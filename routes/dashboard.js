const express = require('express');
const router = express.Router();

/* GET user listing. */
router.get('/', function(req, res) {
    if (!req.session.is_connected) {
        res.redirect('connection')
    } else {
        res.render('dashboard', {
            user_mail: req.session.user_email_connected
        });
    }
});

module.exports = router;
