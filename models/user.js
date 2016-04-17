'use strict';

var bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    displayName: {
      allowNull: false,
      type: DataTypes.STRING
    },
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
        len: [1,255],
        isUnique: function(value, next) {
          User.find({
            where: {email: value},
            attributes: ['id']
          })
          .done(function(error, user) {
            if (error){ return next(error) }
            // be sure to catch erros in controller
            // http://stackoverflow.com/questions/16356856/sequelize-js-custom-validator-check-for-unique-username-password
            if (user){ return next('Email address already in use!') }

            next();
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
        bcrypt.compare(password, this.password, next)
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

  var hasSecurePassword = function(user, options, callback) {
    // https://nodeontrain.xyz/tuts/secure_password/
    // if (user.password != user.password_confirmation) {
    //   throw new Error('Password confirmation doesn\'t match Password');
    // }
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
      if (err) return callback(err);
      user.set('password', hash);
      return callback(null, options);
    });
  };

  User.beforeCreate(function(user, options, callback) {
    if (user.password)
      hasSecurePassword(user, options, callback);
    else
      return callback(null, options);
  })

  User.beforeUpdate(function(user, options, callback) {
    if (user.password)
      hasSecurePassword(user, options, callback);
    else
      return callback(null, options);
  })
  return User;
};