
var request = require('supertest')
var should = require('should')
var sinon = require('sinon')

var app = require('../../../server/app')
var rdbService  = require('../../../server/services/rdb-service')
var ActivityKlass = require('../../../server/models/Activity')
var MessageKlass = require('../../../server/models/Message')

describe('Activities Controller', () => {

  describe('#index', () => {

    var rdbReturnData = new ActivityKlass({title: 'My Activity'})
    beforeEach(() => {
      sinon.stub(rdbService, 'all', function(Klass, cb) {
        Klass.should.eql(ActivityKlass)
        cb(null, [rdbReturnData])
      })
    })
    afterEach(() => {
      rdbService.all.restore()
    })

    it('Gets list of all activity objects', (done) => {
      request(app)
        .get('/activity')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.have.property('activities', [rdbReturnData.toJson()])
          sinon.assert.calledOnce(rdbService.all)
          done()
        })
    })
  })

  describe('#show', () => {

    var actId = 'fakeActId'
    var rdbReturnData = new ActivityKlass({id: actId, title: 'My Activity'})
    beforeEach(() => {
      sinon.stub(rdbService, 'get', function(Klass, id, cb) {
        Klass.should.eql(ActivityKlass)
        id.should.eql(actId)
        cb(null, rdbReturnData)
      })
    })
    afterEach(() => {
      rdbService.get.restore()
    })

    it('looks up an activity by id', (done) => {
      request(app)
        .get('/activity/' + actId)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(rdbReturnData.toJson())
          sinon.assert.calledOnce(rdbService.get)
          done()
        })

    })
  })

  describe('#create', () => {

    var actData = {title: 'My New Team'}
    var rdbReturnedData = new ActivityKlass(actData)
    beforeEach(() => {
      sinon.stub(rdbService, 'insert', (Klass, data, cb) => {
        Klass.should.eql(ActivityKlass)
        data.should.eql(actData)
        cb(null, [rdbReturnedData])
      })
    })
    afterEach(() => {
      rdbService.insert.restore()
    })

    it('receives activity data and persists to database', (done) => {
      request(app)
        .post('/activity')
        .send(actData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(actData)
          sinon.assert.calledOnce(rdbService.insert)
          done()
        })
    })
  })

  describe('#messageIndex', () => {

    var activityId = 'fakeActivityId'
    var rdbReturnedData = new MessageKlass({payload: 'Some message'})
    beforeEach(() => {
      sinon.stub(rdbService, 'getByIndex', (Klass, index, value, cb) => {
        Klass.should.eql(MessageKlass)
        index.should.eql('activityId')
        value.should.eql(activityId)
        cb(null, [rdbReturnedData])
      })
    })
    afterEach(() => {
      rdbService.getByIndex.restore()
    })

    it('lists messages for an activity', (done) => {
      request(app)
        .get('/activity/' + activityId + '/messages')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.have.property('messages', [rdbReturnedData.toJson()])
          sinon.assert.calledOnce(rdbService.getByIndex)
          done()
        })
    })
  })

  describe('#createMessage', () => {

    var activityId = 'fakeActivityId'
    var messageData = {activityId, payload: 'A New Message'}
    var rdbReturnedData = new MessageKlass(messageData)
    beforeEach(() => {
      sinon.stub(rdbService, 'insert', (Klass, data, cb) => {
        Klass.should.eql(MessageKlass)
        data.should.eql(messageData)
        cb(null, [rdbReturnedData])
      })
    })
    afterEach(() => {
      rdbService.insert.restore()
    })

    it('lists messages for an activity', (done) => {
      request(app)
        .post('/activity/' + activityId + '/messages')
        .send(messageData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(messageData)
          sinon.assert.calledOnce(rdbService.insert)
          done()
        })
    })
  })

  // describe('#streamMessages', () => {

  //   var actId = 'fakeActId'
  //   var rdbReturnedData = new MessageKlass({activityId: actId, payload: 'Streaming messages' })
  //   beforeEach(() => {
  //     sinon.stub(rdbService, 'streamMessages', function(Klass, id, listener, cb) {
  //       Klass.should.eql(MessageKlass)
  //       id.should.eql(actId)
  //       listener(rdbReturnedData)
  //       listener(rdbReturnedData)
  //     })
  //   })
  //   afterEach(() => {
  //     rdbService.streamMessages.restore()
  //   })

  //   it('lists messages for an activity', (done) => {
  //     function binaryParser(res, callback) {
  //       res.setEncoding('ascii');
  //       res.data = '';
  //       res.on('data', function (chunk) {
  //         console.log('data', chunk)
  //         res.data += chunk;
  //       });
  //       res.on('end', function () {
  //         console.log('End')
  //         callback(null, new Buffer(res.data, 'ascii'));
  //       });
  //     }
  //     request(app)
  //       .get('/activity/' + actId + '/messages/stream')
  //       .expect(200)
  //       .parse(binaryParser)
  //       .end((err, res) => {
  //         console.log('Supertest#End')
  //         if (err) return done(err)

  //         done()
  //       })

  //   })
  // })
})

