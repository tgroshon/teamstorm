import request from 'supertest'
import should from 'should'
import sinon from 'sinon'
import app from '../../../server/app'
import rdbService from '../../../server/services/rdb-service'
import * as authService from '../../../server/services/auth-service'
import ActivityKlass from '../../../server/models/Activity'
import MessageKlass from '../../../server/models/Message'

describe('Activities Controller', () => {
  var userData
  var token
  var userId
  var fakeTeam

  beforeEach(() => {
    userId = 'fakeId'
    userData = {id: userId, firstName: 'Bob'}
    token = authService.encode(userData)
    fakeTeam = {id: 'bob'}
  })

  describe('#index', () => {

    var rdbReturnData = new ActivityKlass({title: 'My Activity'})

    beforeEach(() => {
      sinon.stub(rdbService, 'getByIndex', function(Klass, index, value, cb) {
        value.should.be.an.Array // In this instance
        cb(null, [rdbReturnData])
      })
      sinon.stub(rdbService, 'getByMembership', function(Klass, userId, cb) {
        cb(null, [fakeTeam])
      })
    })

    afterEach(() => {
      rdbService.getByIndex.restore()
      rdbService.getByMembership.restore()
    })

    it('Gets list of all activity objects for my teams', (done) => {
      request(app)
        .get('/activity')
        .set('jwt', token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.have.property('activities', [rdbReturnData.toJson()])
          sinon.assert.calledOnce(rdbService.getByIndex)
          sinon.assert.calledOnce(rdbService.getByMembership)
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
        .set('jwt', token)
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

    var actData = {creatorId: 'fakeId', isActive: true, title: 'My New Team'}
    beforeEach(() => {
      sinon.stub(rdbService, 'insert', (Klass, data, cb) => {
        Klass.should.eql(ActivityKlass)
        cb(null, [actData])
      })
    })

    afterEach(() => {
      rdbService.insert.restore()
    })

    it('receives activity data and persists to database', (done) => {
      request(app)
        .post('/activity')
        .set('jwt', token)
        .send(actData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(actData)
          sinon.assert.calledOnce(rdbService.insert)
          done()
        })
    })
  })

  describe('#update', () => {

    var actId = 'someId'
    var teamId = 'someTeamId'
    var newActivityData = {id: actId, teamId: teamId, title: 'New Act'}
    var oldActivityData = {id: actId, teamId: teamId, title: 'Old Act'}
    var newActivity = new ActivityKlass(newActivityData)
    var oldActivity = new ActivityKlass(oldActivityData)

    beforeEach(() => {
      sinon.stub(rdbService, 'get', (Klass, id, cb) => {
        Klass.should.eql(ActivityKlass)
        id.should.eql(actId)
        cb(null, oldActivity)
      })
      sinon.stub(rdbService, 'insert', (Klass, data, cb) => {
        Klass.should.eql(ActivityKlass)
        data.should.eql(newActivityData)
        cb(null, [newActivityData])
      })
      sinon.stub(rdbService, 'getByMembership', (Klass, id, cb) => {
        id.should.eql(userId)
        cb(null, [{id: teamId}])
      })
    })

    afterEach(() => {
      rdbService.insert.restore()
      rdbService.getByMembership.restore()
      rdbService.get.restore()
    })

    it('receives activity data, checks team membership, and updates Activity', (done) => {
      request(app)
        .put('/activity')
        .set('jwt', token)
        .send(newActivityData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(newActivity.toJson())
          sinon.assert.calledOnce(rdbService.insert)
          sinon.assert.calledOnce(rdbService.getByMembership)
          sinon.assert.calledOnce(rdbService.get)
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
        .set('jwt', token)
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
    var payload = 'A New Message'
    var messageData = {payload}
    var rdbReturnedData = new MessageKlass({payload, activityId})

    beforeEach(() => {
      sinon.stub(rdbService, 'insert', (Klass, data, cb) => {
        Klass.should.eql(MessageKlass)
        cb(null, [rdbReturnedData])
      })
    })
    afterEach(() => {
      rdbService.insert.restore()
    })

    it('creates a message for an activity', (done) => {
      request(app)
        .post('/activity/' + activityId + '/messages')
        .set('jwt', token)
        .send(messageData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(rdbReturnedData.toJson())
          sinon.assert.calledOnce(rdbService.insert)
          done()
        })
    })
  })
})
