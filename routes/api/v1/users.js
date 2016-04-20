var Sequelize = require('sequelize')
var models = require('../../../models/index')
var debug = require('debug')('user-controller');
var express = require('express')
var router = express.Router()
var usersController = require('../../../controllers/user.js')

router.get('/', usersController.getAll)
router.get('/:id', usersController.get)
router.post('/', usersController.post)
router.delete('/:id', usersController.delete)
router.put('/:id', usersController.put)

module.exports = router