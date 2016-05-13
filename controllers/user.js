var models = require('../models/index')
var format = require('../util/jsonAPIFormatter')
var logger = require('../util/log')
var errors = require('../util/errors')

var allowedUserAttributes = ['email', 'password', 'displayName']

var createUpdateObject = req => {
  var output = {}
  for (var i = 0; i < allowedUserAttributes.length; i++) {
    var attr = allowedUserAttributes[i]
    if(req.body[attr]){
      output[attr] = req.body[attr]
    }
  }
  return output
}

var usersController = {
  getAll: (req, res, next) => {
    models.User
    .findAll({})
    .then(users => {
      res.json(format(users))
    })
    .catch(next);
  },

  get: (req, res, next) => {
    models.User
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      if(user){
        res.json(format(user))
      } else {
        next(new errors.notFound('User not found'))
      }
    })
    .catch(next)
  },

  delete: (req, res, next) => {
    models.User
    .findOne({
      where: {
        id: req.params.id
      }
    }).then(user => {
      if(user){
        user.destroy().then(() => {
          res.json(format(user))
        })
      } else {
        next(new errors.notFound('User not found'))
      }
    })
    .catch(next)
  },

  post: (req, res, next) => {
    models.User
    .create(createUpdateObject(req))
    .then(user => {
      res.json(format(user));
    })
    .catch(next)
  },

  put: (req, res, next) => {
    models.User
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      if(user){
        user.updateAttributes(createUpdateObject(req))
        .then(user => {
          res.json(format(user));
        })
      } else {
        next(new errors.notFound('User not found'))
      }
    })
    .catch(next)
  }
}

module.exports = usersController
