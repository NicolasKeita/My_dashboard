const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    if (!req.session.is_connected) {
        res.redirect('connection')
    } else {
        req.session.widget1 = req.query.widget1;
        req.session.widget2 = req.query.widget2;
        req.session.widget3 = req.query.widget3;
        res.render('dashboard', {
            user_mail: req.session.user_email_connected,
            widget1: req.session.widget1,
            widget2: req.session.widget2,
            widget3: req.session.widget3
        });
    }
});

module.exports = router;
