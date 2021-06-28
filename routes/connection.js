const express = require('express');
const router = express.Router();
const mysql   = require('mysql');
const _checkRegister = require('../public/js/register');
const _checkLogin = require('../public/js/connexion');

function isModalAccepted(req) {
    console.log('Cookieees', req.cookies);
    return true;
}

router.get('/', function(req, res) {
    if (req.session.is_connected) {
        res.redirect('widget_selection');
    } else {
        isModalAccepted(req);
        const cookieOptions = {
            maxAge : 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: true,
        }
        //res.cookie('cookie_name2', "cookie_value2", cookieOptions);

        res.render('connection', {
            title: 'Nicolas Super Dashboard',
            title_sub: 'Hard work beats talent every time'
        });
    }
});

router.post('/', async function(req, res)
{
    const email_inscription = req.body.email;
    const pw_inscription = req.body.password;

    /*
    const connection = new mysql.createConnection({
        host    : 'db',
        user    : 'admin',
        password: 'admin',
        database: 'test'
    });*/
    /*
    connection.connect(async function(err) {
        if (err) {
            console.error("Is the database Online ?\n");
            console.error(err.stack);
            const message_fail = "Connection failed to the database - " +
                "host : 'localhost' - " +
                "user : 'admin' - " +
                "password : 'admin' -" +
                "database_name : 'test'";

            res.render('connexion_failed', {message: message_fail});
            return;
        }*/

        /*
        if (await isAlreadyInDatabase(email_inscription, connection)) {
            if (await isAlreadyInDatabase_password(email_inscription, pw_inscription, connection)) {
            */
            if (await _checkLogin(email_inscription, pw_inscription)) {
                req.session.is_connected = true;
                req.session.user_email_connected = email_inscription;
                req.session.user_password_connected = pw_inscription;
                res.redirect('widget_selection');
            } else {
                const message_fail = "Sorry. Email found in our database but wrong password.";
                res.render('connection_failed', {message: message_fail});
            }
            /*
        } else {
            const message_fail = "Sorry we cannot find this email in our database :" + email_inscription;
            res.render('connection_failed', {message: message_fail});
        }
        */
    //});
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

async function isAlreadyInDatabase_password(email, password, connection) {
    const request_to_database = 'SELECT * FROM `users` WHERE (`email` = "'
        + email + '" AND `password` = "'+ password + '")';
    return new Promise(function(resolve) {
        connection.query(request_to_database, (err, rows) => {
            resolve(!!rows[0]);
        });
    });
}

module.exports = router;
