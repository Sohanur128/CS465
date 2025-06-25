require('dotenv').config(); //step 8, page 191 [bring the variables defined in the file into our memory space]

const cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Wire in our authentication module: Module 7
var passport = require('passport');
require('./app_api/config/passport');


var indexRouter = require('./app_server/routes/index');
var travelRouter = require('./app_server/routes/travel');

require('./app_api/models/db'); // Connect to API database
const apiRouter = require('./app_api/routes/index'); // API routes

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/app_server/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); // Module 7

// Enable CORS for Angular (localhost:4200)
//app.use(cors({
//  origin: 'http://localhost:4200',
//  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//  allowedHeaders: ['Content-Type', 'Authorization']
//}));

// Enable CORS : Module 7
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});



// Routes
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter); // API route - placed BEFORE 404 handler

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


// Catch unauthorized error and create 401 : Module 7
app.use((err, req, res, next) => { 
    if (err.name === 'UnauthorizedError') { 
        res 
            .status(401) 
            .json({ "message": err.name + ": " + err.message }); 
    } 
});



module.exports = app;
