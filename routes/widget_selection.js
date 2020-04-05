const express = require('express');
const router = express.Router();

router.get('/', function(req, res)
{
    if (!req.session.is_connected) {
        res.redirect('connection');
    } else {
        res.render('widget_selection', {
            user_mail: req.session.user_email_connected
        });
    }
});

module.exports = router;
