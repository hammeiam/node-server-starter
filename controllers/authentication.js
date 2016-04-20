var jwt = require('jsonwebtoken')
var models = require('../models/index')
var secret = process.env.AUTH_SECRET || 'changeMeASAP'

var authenticationController = {
  post: function(req, res, next){
    models.User.findOne({
      email: req.body.email
    })
    .then(function(user){
      if(!user){
        return next({
          status: '401',
          success: false,
          message: 'No such user'
        })
      }

      user.validPassword(req.body.password, function(err, isValid){
        if(err){
          return next(err)
        }
        if(!isValid){
          return next({
            status: '401',
            success: false,
            message: 'Incorrect password'
          })
        }
        var payload = {
          id: user.id,
          email: user.email,
        }
        var options = {
          expiresIn: '7d'
        }
        var token = jwt.sign(payload, secret, options)

        res.json({
          success: true,
          token: token
        })
      })
    })
    .catch(function(err){
      next(err)
    })
  },

  confirm: function(req, res, next){
    // doesn't map to an actual route
    console.log('Authenticating...')
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
      return next({
        status: '403',
        success: false,
        message: 'No token provided.'
      })
    }

    jwt.verify(token, secret, function(err, decoded) {
      if(err){
        return next({
          status: '403',
          success: false,
          message: 'Failed to authenticate token'
        });
      }

      console.log('Authenticated user ' + decoded.id);
      req.currentUser = decoded

      next()
    })
  }
}

module.exports = authenticationController