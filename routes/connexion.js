var express = require('express');
var router = express.Router();
var mysql   = require('sync-mysql');

var connection = new mysql({
    host    : 'localhost',
    user    : 'admin',
    password: '',
    database: 'test'
});


/* GET user listing. */
router.get('/', function(req, res, next) {
    res.redirect('dashboard');
});

router.post('/', function(req, res, next) {

    const email_inscription = req.body.email;
    const pw_inscription = req.body.password;

    if (isAlreadyInDatabase(email_inscription)) {
        if (isAlreadyInDatabase_password(email_inscription, pw_inscription)) {
            req.session.is_connected = true;
            req.session.user_email_connected = email_inscription;
            req.session.user_password_connected = pw_inscription;
            res.redirect('dashboard');
        } else {
            const message_fail = "Sorry. Email found in our database but wrong password.";
            res.render('connexion_failed', {message: message_fail});
        }
    } else {
        const message_fail = "Sorry we cannot find this email in our database :" + email_inscription;
        res.render('connexion_failed', {message: message_fail});
    }
});

function isAlreadyInDatabase(email) {
    const request_to_database = 'SELECT * FROM `users` WHERE `email` = "'
        + email + '"';
    const result = connection.query(request_to_database);
    return !!result[0];
}

function isAlreadyInDatabase_password(email, password) {
    const request_to_database = 'SELECT * FROM `users` WHERE (`email` = "'
        + email + '" AND `password` = "'+ password + '")';
    const result = connection.query(request_to_database);
    return !!result[0];
}

module.exports = router;
