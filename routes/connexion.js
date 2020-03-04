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
    res.render('register');
});

router.post('/', function(req, res, next) {
    connection.query('INSERT INTO `users`(`email`, `password`) VALUES ("nico@epitech.fr", "private_password2")', function(err, rows, fields) {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;
