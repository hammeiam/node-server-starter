var app = require('../app')
var request = require('supertest')(app);
var expect = require('expect')
var factory = require('../factories')
var models = require('../models');
var sinon = require('sinon');

describe('stubbed', function () {
  // generic stuff
  // before(function(done){
  //   models.sequelize.sync({force: true})
  //     .then(function(){ done() })
  //     .catch(function(err){ console.log(err) })
  // })

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
    // var returnedUser = models.User.create({
    //   id: 1,
    //   email: 'test@test.com',
    //   password: 'password'
    // }).then(newUser => {
    //   console.log(newUser.get('password'));
    // })
    // returnedUser.get('password')
    // models.User.beforeCreate(returnedUser, null, (user) => {console.log(user);})

    var findOne = sinon.stub(models.User, 'findOne')
    // var validPassword = sinon.stub(models.User, 'validPassword')
    var create = sinon.stub(models.User, 'create', function (newUser) {
      return new Promise(function (resolve) {
        resolve(newUser);
      });
    });
    var returnedUser = models.User.build({
      id: 1,
      email: 'test@test.com',
      password: 'password'
    }).save().then(newUser => {
      console.log(newUser);
      console.log(newUser.get('password'));
    })
    // var save = sinon.stub(returnedUser, 'save')
    // save.returns(console.log('saved user'))
    // returnedUser.save()
    // console.log(returnedUser.get('password'));
    findOne.returns(new Promise(function(resolve, reject){
      resolve(returnedUser)
    }))
    // validPassword.returns(true)
    // create.returns(new Promise(function(resolve, reject){
    //   resolve(returnedUser)
    // }))

    request
      .post('/api/v1/authenticate')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(function(res){console.log(res.error)})
      .expect(200)
      .expect(function(res){
        expect(res.body.token).toExist()
      })
      .end(done);
  });

  // model routes
});