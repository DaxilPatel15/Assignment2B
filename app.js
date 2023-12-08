const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


const passport = require("passport");
const session = require("express-session");
const User = require("./models/user");

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/logins');

const config = require('./config/globals');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(session(
  {
    secret: "fall2023jsframeworks",
    resave: false,
    saveUninitialized: false
  }
));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB connection
mongoose
  .connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Successfully!!!');
  })
  .catch((err) => {
    console.error('Error while connecting to MongoDB:', err);
  });

// Define your routes
app.use('/', indexRouter);
app.use('/login', loginRouter);

// Route for /viewss/viewadd
app.get('/viewss/viewadd', (req, res) => {
  // Your logic to retrieve data goes here (if needed)
  const data = {
    title: 'View Add Page',
    // Any other data you want to pass to the view
  };

  // Render the view (viewadd.hbs) with the provided data
  res.render('viewadd', data);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
