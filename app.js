const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const connectionRouter = require('./routes/connection');
const dashboardRouter = require('./routes/dashboard');
const disconnectionRouter = require('./routes/disconnection');
const connectThroughGoogleRouter = require('./routes/connectThroughGoogle');
const youtubeChannelInformationWidgetRouter = require('./routes/youtubeChannelInformationWidget');
const youtubeVideoInformationWidgetRouter = require('./routes/youtubeVideoInformationWidget');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "cookie_secret",
  name: "cookie_name",
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/connection', connectionRouter);
app.use('/connectThroughGoogle', connectThroughGoogleRouter);
app.use('/disconnection', disconnectionRouter);
app.use('/register', registerRouter);
app.use('/youtubeChannelInformationWidget', youtubeChannelInformationWidgetRouter);
app.use('/youtubeVideoInformationWidget', youtubeVideoInformationWidgetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
