var bluebird = require('bluebird');
var models = require('../models');
var faker = require('faker');
var factory = require('factory-girl').promisify(bluebird);
var factoryGirlSequelize = require('factory-girl-sequelize')
factory.setAdapter(new factoryGirlSequelize())

function emailDomain(){
  var domains = ['aol.com','gmail.com','yahoo.com','weird.org','why.net']
  var rand = Math.floor(Math.random() * domains.length)
  return domains[rand]
}

factory.define('user', models.User, {
  email: factory.sequence(function(n) {
    return 'user' + n + '@' + emailDomain();
  }),
  password: 'password'
});

module.exports = factory;