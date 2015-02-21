
var request = require('supertest')
var should = require('should')
var sinon = require('sinon')

var app = require('../../../server/app.js')
var rdbService  = require('../../../server/services/rdb-service')
var authService  = require('../../../server/services/auth-service')
var UserModel = require('../../../server/models/User')

describe('Users Controller', () => {

  describe('#index', () => {

    var allUsers = [new UserModel({firstName: 'bob'})]
    beforeEach(() => {
      sinon.stub(rdbService, 'all', (UserKlass, cb) => {
        UserModel.should.eql(UserKlass)
        cb(null, allUsers)
      })
    })
    afterEach(() => {
      rdbService.all.restore()
    })

    it('lists users', (done) => {
      request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          var expectedData = allUsers.map((user) => {
            return user.toJson()
          })
          res.body.should.have.property('users', expectedData)
          sinon.assert.calledOnce(rdbService.all)
          done()
        })
    })
  })

  describe('#search', () => {

    var reqQuery = 'gmail'
    var allUsers = [new UserModel({firstName: 'bob'})]
    beforeEach(() => {
      sinon.stub(rdbService, 'searchUser', (UserKlass, fields, query, cb) => {
        query.should.eql(reqQuery)
        UserKlass.should.eql(UserModel)
        cb(null, allUsers)
      })
    })
    afterEach(() => {
      rdbService.searchUser.restore()
    })

    it('sends requested query to database and returns matches', (done) => {
      request(app)
        .get('/users/search')
        .query({q: reqQuery})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          var expectedData = allUsers.map((user) => {
            return user.toJson()
          })
          res.body.should.have.property('users', expectedData)
          sinon.assert.calledOnce(rdbService.searchUser)
          done()
        })
    })
  })

  describe('#create', () => {

    var userData = { firstName: 'bob', password: 'pwd1' }
    var hashedPassword = 'hashedPassword'
    var rdbReturnedData = {firstName: 'bob'}
    beforeEach(() => {
      sinon.stub(authService, 'hash', (password, cb) => {
        password.should.eql(userData.password)
        cb(null, hashedPassword)
      })
      sinon.stub(rdbService, 'insert', (UserKlass, data, cb) => {
        UserKlass.should.eql(UserModel)
        data.should.have.property('hash', hashedPassword)
        cb(null, [rdbReturnedData])
      })
    })
    afterEach(() => {
      rdbService.insert.restore()
      authService.hash.restore()
    })

    it('receives user data and persists to database', (done) => {
      request(app)
        .post('/users')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(rdbReturnedData)
          sinon.assert.calledOnce(rdbService.insert)
          sinon.assert.calledOnce(authService.hash)

          done()
        })
    })
  })

  describe('#login', () => {

    var pwdHash = 'hashedPassword'
    var loginEmail = 'bob@example.com'
    var loginPassword = 'pwd1'
    var rdbReturnedData = new UserModel({email: loginEmail, hash: pwdHash})
    beforeEach(() => {
      sinon.stub(authService, 'compare', (password, hash, cb) => {
        password.should.eql(loginPassword)
        hash.should.eql(pwdHash)
        cb(null, true)
      })
      sinon.stub(rdbService, 'getByIndex', (UserKlass, index, value, cb) => {
        UserKlass.should.eql(UserModel)
        index.should.eql('email')
        value.should.eql(loginEmail)
        cb(null, [rdbReturnedData])
      })
    })
    afterEach(() => {
      authService.compare.restore()
      rdbService.getByIndex.restore()
    })

    it('receives email and password and returns a token', (done) => {
      request(app)
        .post('/login')
        .send({
          email: loginEmail,
          password: loginPassword
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err)

          var expectedToken = authService.encode({email: loginEmail})
          res.body.should.have.property('token', expectedToken)
          sinon.assert.calledTwice(rdbService.getByIndex)
          sinon.assert.calledOnce(authService.compare)

          done()
        })
    })
  })
})

