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

// configuration for accepting CORS requests, can be removed
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
  Authorization')
  next()
})

app.use(morgan('dev'));

//--- ROUTING ---//
app.get('/', function(req, res) {
  res.send('Your server is alive! Remove this route.')
})

// var apiRouter = express.Router();
// apiRouter.get('/', function(req, res) {
//   res.json({ message: 'hooray! welcome to our api!' });
// })

app.use('/', apiRouter);

// error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

module.exports = app