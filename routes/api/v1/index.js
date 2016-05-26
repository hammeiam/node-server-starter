var express = require('express')
var router = express.Router()
var users = require('./users')
var authenticationController = require('../../../controllers/authentication.js')

// unprotected routes
router.post('/authenticate', authenticationController.post)

// Authentication middleware
// Comment me out to create your first user via the api
// router.use(authenticationController.confirm)

// authentication-protected routes below
router.use('/users', users)

module.exports = router
