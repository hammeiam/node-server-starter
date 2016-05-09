'use strict';

var bcrypt = require('bcrypt')
var errors = require('../util/errors')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isLowercase: true,
        notEmpty: true,
        len: [5,255],
        isUnique: function(value, next) {
          var self = this
          User.find({
            where: {email: value},
            attributes: ['id']
          })
          .then(function(user) {
            // http://stackoverflow.com/questions/16356856/sequelize-js-custom-validator-check-for-unique-username-password
            if (user && user.id !== self.id){
              return next('Email address already in use!')
            }

            return next();
          }).catch(function(err){
            return next(err)
          });
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods:{
      validPassword : function (password, next) {
        return bcrypt.compare(password, this.password, next)
      },
      toJSON: function(){
        return {
          displayName: this.displayName,
          email: this.email,
          id: this.id
        }
      }
    }
  });

  User.beforeValidate(function(user, options){
    if(user.email){
      user.email = user.email.toLowerCase()
    }
  })

  var hasSecurePassword = function(user, options, next) {
    // https://nodeontrain.xyz/tuts/secure_password/
    // if (user.password != user.password_confirmation) {
    //   throw new Error('Password confirmation doesn\'t match Password');
    // }
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
      if (err) return next(err);
      user.set('password', hash);
      return next();
    });
  };

  User.beforeCreate(function(user, options, next) {
    if (user.password)
      hasSecurePassword(user, options, next);
    else
      return next();
  })

  User.beforeUpdate(function(user, options, next) {
    if (user.password)
      hasSecurePassword(user, options, next);
    else
      return next();
  })
  return User;
};