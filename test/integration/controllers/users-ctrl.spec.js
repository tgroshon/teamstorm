
var request = require('supertest')
var should = require('should')
var app = require('../../../server/app.js')

describe('Users Controller', () => {

  describe('#index', () => {
    
    it('lists users', (done) => {
      request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.have.property('users')
          done()
        })
    })
  })

  describe('#search', () => {
    it('lists users whose email matches', (done) => {
      request(app)
        .get('/users/search')
        .query({q: 'gmail'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.have.property('users')
          res.body.users[0].email.should.match(/^.*gmail/)
          done()
        })
    })

    // TODO test name matching
    // TODO test fuzzy matching
  })

  describe('#create', () => {
    false.should.be.true
  })

  describe('#token', () => {
    false.should.be.true
  })
})

