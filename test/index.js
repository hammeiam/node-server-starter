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


  // it('returns a token', function (done) {
  //   var user = factory.buildSync('user')
  //
  //   user.save()
  //   .then(function(user){
  //     request
  //       .post('/api/v1/authenticate')
  //       .send({
  //         email: user.email,
  //         password: 'password'
  //       })
  //       .expect(200)
  //       .expect(function(res){
  //         expect(res.body.token).toExist()
  //       })
  //       .end(done);
  //   })
  // });

  // model routes
});