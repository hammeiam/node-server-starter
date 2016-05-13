var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var apiRouter = require('./routes');
var errors = require('./util/errors')
var logger = require('./util/log')
var appPort = process.env.PORT || 8080
var logType = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('port', appPort);
if(app.get('env') !== 'test'){
  app.use(morgan(logType, { 'stream': logger.stream }))
}

//--- HEADERS ---//
app.use((req, res, next) => {
  // set content type because this is a json api
  res.setHeader('Content-Type', 'application/vnd.api+json')

  // configuration for accepting CORS requests, can be removed
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
  Authorization')
  next()
})

//--- ROUTING ---//
app.get('/', function(req, res) {
  res.status(200).json({message: 'Your server is alive! Remove this route from app.js'})
})

app.use('/', apiRouter);

//--- ERROR HANDLING ---//
app.use((req, res, next) => {
  // if no other controllers have returned by now, it's a 404
  next(new errors.notFound())
});

app.use((err, req, res, next) => {
  // handle Sequelize errors explicitly
  if(err.name === 'SequelizeValidationError'){
    var message = err.message || 'Invalid Input'
    return next(new errors.validation(message))
  }

  next(err)
});

app.use((err, req, res, next) => {
  // Catch and process all other errors here.
  // Errors returned in JSON API compliant format
  // http://jsonapi.org/examples/#error-objects
  var status = err.status ? err.status : 500

  // only log the error if we haven't handled it via errors.js
  if(status >= 500){ logger.error(err) }

  res
    .status(status)
    .json({
    errors: [
      {
        status: status.toString(),
        detail: err.message,
        title: err.title,
        errorDetails: (app.get('env') === 'development') ? err : {}
      }
    ]
  });
});

module.exports = app