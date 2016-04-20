var models = require('../models/index')
var debug = require('debug')('user-controller');

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
      res.json(users)
    })
    .catch(function(err){
      next(err)
    });
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
        res.json(user)
      } else {
        next()
      }
    })
    .catch(function(err){
      next(err)
    })
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
          res.json(user)
        })
      } else {
        next()
      }
    })
    .catch(function(err) {
      next(err)
    })
  },

  post: function postUser(req, res, next) {
    models.User
    .create(createUpdateObject(req))
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err){
      next(err)
    })
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
          res.send(user);
        })
      } else {
        next()
      }
    })
    .catch(function(err){
      next(err)
    })
  }
}

module.exports = usersController
