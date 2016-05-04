var jwt = require('jsonwebtoken')
var models = require('../models/index')
var errors = require('../util/errors')
var secret = process.env.AUTH_SECRET || 'changeMeASAP'

var authenticationController = {
  post: function(req, res, next){
    models.User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(function(user){
      if(!user){
        return next(errors.unauthorized('No such user'))
      }

      user.validPassword(req.body.password, function(err, isValid){
        if(err){
          return next(err)
        }
        if(!isValid){
          return next(errors.unauthorized('Incorrect password'))
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
    .catch(next)
  },

  confirm: function(req, res, next){
    // doesn't map to an actual route
    console.log('Authenticating...')
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
      return next(errors.forbidden('No token provided'))
    }

    jwt.verify(token, secret, function(err, decoded) {
      if(err){
        return next(errors.forbidden('Failed to authenticate token'))
      }

      console.log('Authenticated user ' + decoded.id);
      req.currentUser = decoded

      next()
    })
  }
}

module.exports = authenticationController