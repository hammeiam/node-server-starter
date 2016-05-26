var express = require('express')
var passport = require('passport');
var router = express.Router()
var usersController = require('../../../controllers/user.js')
var authenticate = require('../../../config/passport').authenticate

router.get('/', authenticate(), usersController.getAll)
router.get('/:id', usersController.get)
router.post('/', usersController.post)
router.delete('/:id', usersController.delete)
router.put('/:id', usersController.put)

module.exports = router
