var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mysql   = require('sync-mysql');
var router = express.Router();

var connection = new mysql({
    host    : 'localhost',
    user    : 'admin',
    password: '',
    database: 'test'
});

/*
var once = false;
if (once === false) {
    connection.connect();
    once = true;
}*/

/* GET user listing. */
router.get('/', function(req, res, next) {
    res.render('');
});

router.post('/', function(req, res, next) {
    const email_inscription = req.body.email;
    const pw_inscription = req.body.password;

    if (!isAlreadyInDatabase(email_inscription))
    {
        const request_to_database = 'INSERT INTO `users`(`email`, `password`) VALUES ("' +
            email_inscription + '", "' +
            pw_inscription + '")';
        const message_success = "Congratulations, you have successfully register :" + email_inscription;
        connection.query(request_to_database);
        res.render('register', {message: message_success});
    } else {
        const message_fail = "This user already exist in our database :" + email_inscription;
        res.render('register', {message: message_fail});
    }
});

function isAlreadyInDatabase(email) {
    const request_to_database = 'SELECT * FROM `users` WHERE `email` = "'
        + email + '"';
    const result = connection.query(request_to_database);
    return !!result[0];
}

module.exports = router;
