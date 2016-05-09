var app = require('../app')
var request = require('supertest')(app);
var expect = require('expect')
var factory = require('../factories')
var models = require('../models');

describe('loading express', function () {
  // generic stuff
  before(function(done){
    models.sequelize.sync({force: true})
      .then(function(){ done() })
      .catch(function(err){ console.log(err) })
  })

  it('responds to /', function (done) {
    request
      .get('/')
      .expect(200)
      .end(done)
  });
  // errors
  it('404 everything else', function (done) {
    request
      .get('/foo/bar')
      .expect(404)
      .end(done)
  });

  it('returns 401 without token', function (done) {
    request
      .get('/api/v1/users')
      .expect(401)
      .expect(function(res){
        var errors = res.body.errors
        expect(errors).toExist()
        expect(errors.length).toBe(1)
        var err = errors[0]
        expect(err.detail).toBe('No token provided')
      })
      .end(done)
  });

  it('returns 401 with bad token', function (done) {
    var badToken = 'abcd'
    request
      .get('/api/v1/users')
      .set('x-access-token', badToken)
      .expect(401)
      .expect(function(res){
        var errors = res.body.errors
        expect(errors).toExist()
        expect(errors.length).toBe(1)
        var err = errors[0]
        expect(err.detail).toBe('Failed to authenticate token')
      })
      .end(done);
  });

  it('returns a token', function (done) {
    var user = factory.buildSync('user')

    user.save()
    .then(function(user){
      request
        .post('/api/v1/authenticate')
        .send({
          email: user.email,
          password: 'password'
        })
        .expect(200)
        .expect(function(res){
          expect(res.body.token).toExist()
        })
        .end(done);
    })
  });

  // model routes
});