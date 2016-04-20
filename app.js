var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var apiRouter = require('./routes');
// var mongoose = require('mongoose')
// var dbHost = 'localhost'
// var dbName = 'node-server-starter'
var appPort = process.env.PORT || 8080

// connect to our db
// mongoose.connect('mongodb://' + dbHost + '/' + dbName);

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'));

//--- HEADERS ---//
// configuration for accepting CORS requests, can be removed
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
  Authorization')
  next()
})

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/vnd.api+json')
  next()
})

//--- ROUTING ---//
app.get('/', function(req, res) {
  res.send('Your server is alive! Remove this route.')
})

app.use('/', apiRouter);

// 404 middleware
app.use(function(req, res, next) {
  res.status(404).send({
    success: false,
    status: '404',
    errors: ['404 Not Found']
  });
});

// validation erro handling middleware
app.use(function(err, req, res, next) {
  console.log(err)

  if(err.name === 'SequelizeValidationError'){
    var message = err.message || 'Invalid Input'
    return next({
      success: false,
      status: '422',
      message: message
    })
  }

  next(err)
});


// catchall error handling
app.use(function(err, req, res, next) {
  console.log(err)

  res.status(err.status || 500);
  res.json({
    success: false,
    status: res.status,
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

module.exports = app