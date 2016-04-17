var models = require('../../../models/index')
var debug = require('debug')('user-controller');
var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
  debug('Fetching all users')
  models.User.findAll({}).then(function(users) {
    res.json(users)
  }).catch(function(err){
    res.json({
      error: err
    })
  });
})

router.post('/', function(req, res){
  debug('Creating new user')
  models.User.create({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.displayName
  }).then(function(user) {
    res.json(user);
  }).catch(function(err){
    res.json({
      error: err
    })
  })
})

router.get('/:id', function(req, res){
  debug('Fetching user ' + req.params.id)
  models.User.find({
    where: {
      id: req.params.id
    }
  }).then(function(user){
    res.json(user)
  }).catch(function(err){
    res.json({
      error: err
    })
  })
})

router.put('/:id', function(req, res) {
  debug('Updating user ' + req.params.id)
  models.User.find({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    if(user){
      user.updateAttributes({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName
      }).then(function(user) {
        res.send(user);
      })
    }
  })
})

module.exports = router
