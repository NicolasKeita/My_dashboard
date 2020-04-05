const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const _checkRegister = require('../public/js/register');

router.get('/', function(req, res) {
    if (req.session.is_connected) {
        res.redirect('connection');
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

    /*
    if (!await isAlreadyInDatabase(email_inscription, connection))
    {
        const request_to_database = 'INSERT INTO `users`(`email`, `password`) VALUES ("' +
            email_inscription + '", "' +
            pw_inscription + '")';
        await connection.query(request_to_database);
        */

    if (await _checkRegister(email_inscription, pw_inscription)) {


        req.session.user_email_connected = email_inscription;
        req.session.user_password_connected = pw_inscription;
        req.session.is_connected = true;
        res.redirect('connection');
    } else {
        const message_fail = "This user already exist in our database :" + email_inscription;
        res.render('connection_failed', {message: message_fail});
    }
});

function isAlreadyInDatabase(email, connection) {
    const request_to_database = 'SELECT * FROM `users` WHERE `email` = "'
        + email + '"';
    return new Promise(function(resolve) {
        connection.query(request_to_database, (err, rows) => {
            resolve(!!rows[0]);
        });
    });
}

module.exports = router;
