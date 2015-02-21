
var request = require('supertest')
var should = require('should')
var sinon = require('sinon')

var app = require('../../../server/app')
var rdbService  = require('../../../server/services/rdb-service')
var ActivityModel = require('../../../server/models/Activity')

describe('Activities Controller', () => {

  describe('#index', () => {

    it('Gets list of all activity objects', (done) => {
      var allActivities = ['Act 1', 'Act 2'].map((title) => {
        return new ActivityModel({title})
      })
      sinon.stub(rdbService, 'all', function(ActKlass, cb) {
        ActivityModel.should.eql(ActKlass)
        cb(null, allActivities)
      })

      request(app)
        .get('/activity')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          var expectedData = allActivities.map((act) => {
            return act.toJson()
          })
          res.body.should.have.property('activities', expectedData)
          sinon.assert.calledOnce(rdbService.all)
          rdbService.all.restore()
          done()
        })
    })
  })

  // describe('#show', () => {
  //   false.should.be.true
  // })

  // describe('#create', () => {
  //   false.should.be.true
  // })

  // describe('#messageIndex', () => {
  //   false.should.be.true
  // })

  // describe('#createMessage', () => {
  //   false.should.be.true
  // })

  // describe('#streamMessages', () => {
  //   false.should.be.true
  // })
})

