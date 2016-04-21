var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var apiRouter = require('./routes');
var errors = require('./util/errors')
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
    errors: [
      errors.notFound()
    ]
  });
});

// validation error handling middleware
app.use(function(err, req, res, next) {
  console.log(err)

  if(err.name === 'SequelizeValidationError'){
    var message = err.message || 'Invalid Input'
    return next({
      status: '422',
      message: message
    })
  }

  next(err)
});


// catchall error handling
app.use(function(err, req, res, next) {
  console.log(err)
  // handle multiple errors, format like http://jsonapi.org/examples/#error-objects

  res.status(err.status || 500);
  if(err.hasOwnProperty('title')){
    // I'm guessing this was a handled error
    res.json({
      errors: [
        err
      ]
    });
  } else {
    res.json({
      errors: [
        {
          status: err.status,
          message: err.message,
          errorDetails: (app.get('env') === 'development') ? err : {}
        }
      ]
    });
  }
});

module.exports = app