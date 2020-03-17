const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', function(req, res) {
    if (req.session.is_connected) {
        res.render('dashboard', {
            user_mail: req.session.user_email_connected
        });
    } else {
        res.render('register', {
            title: 'Nicolas Super Dashboard',
            title_sub: 'Hard work beats talent every time'
        });
    }
});

router.post('/', async function(req, res) {
    const email_inscription = req.body.email;
    const pw_inscription = req.body.password;

    const connection = new mysql.createConnection({
        host    : 'localhost',
        user    : 'admin',
        password: '',
        database: 'test'
    });

    if (!isAlreadyInDatabase(email_inscription, connection))
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

function isAlreadyInDatabase(email, connection) {
    const request_to_database = 'SELECT * FROM `users` WHERE `email` = "'
        + email + '"';
    const result = connection.query(request_to_database);
    return !!result[0];
}

module.exports = router;
