var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/', function(req, res, next) {
    req.session.is_connected = false;
    res.redirect('/');
});

module.exports = router;
