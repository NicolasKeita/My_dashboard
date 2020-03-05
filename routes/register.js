var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mysql   = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'admin',
    password: '',
    database: 'test'
});

var once = false;
if (once === false) {
    connection.connect();
    once = true;
}

/* GET user listing. */
router.get('/', function(req, res, next) {
    res.render('');
});

router.post('/', function(req, res, next) {
    const email_inscription = req.body.email;
    const pw_inscription = req.body.password;
    const request_to_database = 'INSERT INTO `users`(`email`, `password`) VALUES ("' +
        email_inscription + '", "' +
        pw_inscription + '")';

    if (!isAlreadyInDatabase(email_inscription)) {
        connection.query(request_to_database, function (err, rows, fields) {
            if (err) throw err;
            res.render('register', {user_mail: email_inscription});
        });
    }
});

function isAlreadyInDatabase(email) {
    const request_to_database = 'SELECT * FROM `users` WHERE `email` = "'
        + email + '"';

    connection.query(request_to_database, function(err, rows, fields) {
        if (err) throw err;
        return !!rows[0];
    });
}

module.exports = router;
