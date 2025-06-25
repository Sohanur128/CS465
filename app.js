// not connecting to monn. = needs to be fixed = final project 

// updated 6.38 pm

const cors = require('cors'); // added June 25
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app_server/routes/index'); //new added
var travelRouter = require('./app_server/routes/travel'); //added 
var aboutRouter = require('./app_server/routes/about'); //added 
var contactRouter = require('./app_server/routes/contact'); //added 
var mealsRouter = require('./app_server/routes/meals'); //added 
var newsRouter = require('./app_server/routes/news'); //added 
var roomsRouter = require('./app_server/routes/rooms'); //added 

// Wire in our authentication module M7 P
var passport = require('passport'); 
require('./app_api/config/passport'); 
require('./app_api/models/db'); // Connect to API database June 25
const apiRouter = require('./app_api/routes/index'); // API router June 25


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

require('dotenv').config(); // Module 7 P


// register handlebars partials
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/app_server/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //added
app.use('/travel', travelRouter); //added 
app.use('/about', aboutRouter); //added 
app.use('/contact', contactRouter); //added 
app.use('/meals', mealsRouter); //added 
app.use('/news', newsRouter); //added 
app.use('/rooms', roomsRouter); //added 

// Next two lines from M7 P
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(passport.initialize());

// Routes Proposed June 23 T
// app.use('/api', apiRouter); // API route - placed BEFORE 404 handler

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Catch unauthorized error and create 401 
app.use((err, req, res, next) => { 
  if(err.name === 'UnauthorizedError') { 
    res 
      .status(401) 
      .json({"message": err.name + ": " + err.message}); 
  } 
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


// Enable CORS From Module 7 P
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


module.exports = app;
