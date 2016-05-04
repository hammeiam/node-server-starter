var models = require('../models/index')
var debug = require('debug')('user-controller');
var format = require('../util/jsonAPIFormatter')

var allowedUserAttributes = ['email', 'password', 'displayName']

var createUpdateObject = function(req){
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
  getAll: function getAllUsers(req, res, next){
    models.User
    .findAll({})
    .then(function(users) {
      res.json(format(users))
    })
    .catch(next);
  },

  get: function getUser(req, res, next){
    models.User
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(user){
      if(user){
        res.json(format(user))
      } else {
        next()
      }
    })
    .catch(next)
  },

  delete: function deleteUser(req, res, next){
    models.User
    .findOne({
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      if(user){
        user.destroy().then(function() {
          res.json(format(user))
        })
      } else {
        next()
      }
    })
    .catch(next)
  },

  post: function postUser(req, res, next) {
    models.User
    .create(createUpdateObject(req))
    .then(function(user) {
      res.json(format(user));
    })
    .catch(next)
  },

  put: function putUser(req, res, next) {
    models.User
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(user) {
      if(user){
        user.updateAttributes(createUpdateObject(req))
        .then(function(user) {
          res.send(format(user));
        })
      } else {
        next()
      }
    })
    .catch(next)
  }
}

module.exports = usersController
