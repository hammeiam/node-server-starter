var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var User = require('../models').User;
var errors = require('../util/errors');
var secret = process.env.AUTH_SECRET || 'changeMeASAP';

// Setup work and export for the JWT passport strategy
var setup = passport => {
  var opts = {};
  opts.secretOrKey = secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');

  passport.use(new JwtStrategy(opts, (jwt_payload, next) => {
    User.findOne({
      where: {
        id: jwt_payload.id
      }
    })
    .then(user => {
      if(user){
        next(null, user)
      } else {
        next(errors.unauthorized('No such user'), false)
      }
      return null; // to prevent warning about non-return from promise by Bluebird
    })
    .catch(err => {
      next(err, false)
    })
  }));
};

var authenticate = () => {
  var options = {
    session: false,
    failWithError: true
  }
  return passport.authenticate('jwt', options)
}

module.exports = {
  setup,
  authenticate
}
