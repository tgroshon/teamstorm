
import request from 'supertest'
import should from 'should'
import sinon from 'sinon'

import app from '../../../server/app.js'
import rdbService  from '../../../server/services/rdb-service'
import authService  from '../../../server/services/auth-service'
import TeamKlass from '../../../server/models/Team'

describe('Teams Controller', () => {

  describe('#index', () => {

    var userId = 'fakeId'
    var userData = {id: userId, firstName: 'Bob'}
    var token = authService.encode(userData)
    var rdbReturnedData = new TeamKlass({name: 'My Team'})
    beforeEach(() => {
      sinon.stub(rdbService, 'getByMembership', (Klass, id, cb) => {
        Klass.should.eql(TeamKlass)
        id.should.eql(userId)
        cb(null, [rdbReturnedData])
      })
    })
    afterEach(() => {
      rdbService.getByMembership.restore()
    })

    it('lists teams', (done) => {
      request(app)
        .get('/teams')
        .set('jwt', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.have.property('teams', [rdbReturnedData.toJson()])
          sinon.assert.calledOnce(rdbService.getByMembership)
          done()
        })
    })
  })

  describe('#show', () => {

    var teamId = 'fakeTeamId'
    var rdbReturnedData = new TeamKlass({id: teamId, name: 'My Team'})
    beforeEach(() => {
      sinon.stub(rdbService, 'get', (Klass, id, cb) => {
        Klass.should.eql(TeamKlass)
        id.should.eql(teamId)
        cb(null, rdbReturnedData)
      })
    })
    afterEach(() => {
      rdbService.get.restore()
    })

    it('looks up a team by id', (done) => {
      request(app)
        .get('/teams/' + teamId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(rdbReturnedData.toJson())
          sinon.assert.calledOnce(rdbService.get)
          done()
        })
    })
  })

  describe('#create', () => {

    var teamData = {name: 'My Team'}
    var rdbReturnedData = new TeamKlass(teamData)
    beforeEach(() => {
      sinon.stub(rdbService, 'insert', (Klass, data, cb) => {
        Klass.should.eql(TeamKlass)
        data.should.eql(teamData)
        cb(null, [rdbReturnedData])
      })
    })
    afterEach(() => {
      rdbService.insert.restore()
    })

    it('receives team data and persists to database', (done) => {
      request(app)
        .post('/teams')
        .send(teamData)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          res.body.should.eql(teamData)
          sinon.assert.calledOnce(rdbService.insert)
          done()
        })

    })
  })
})

