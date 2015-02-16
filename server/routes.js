'use strict'

var express = require('express')
var router = express.Router()
var usersCtrl = require('./controllers/users-ctrl')
var teamsCtrl = require('./controllers/teams-ctrl')
var activityCtrl = require('./controllers/activity-ctrl')
var sseMiddleware = require('./middlewares/sse-response')
var authMiddleware = require('./middlewares/authentication')

router.get('/users', usersCtrl.index)
router.get('/users/search', usersCtrl.search)
router.post('/users', usersCtrl.create)
router.post('/login', authMiddleware.passwordAuth, usersCtrl.token)
router.get('/token', authMiddleware.tokenAuth, authMiddleware.stub)

router.get('/activity/:activityId', activityCtrl.show)
router.get('/activity', activityCtrl.index)
router.post('/activity', activityCtrl.create)
router.get('/activity/:activityId/messages/stream', sseMiddleware, activityCtrl.streamMessages)
router.get('/activity/:activityId/messages', activityCtrl.messageIndex)
router.post('/activity/:activityId/messages', activityCtrl.createMessage)

router.get('/teams', authMiddleware.tokenAuth, teamsCtrl.index)
router.get('/teams/debug', teamsCtrl.debug)
router.get('/teams/:teamId', teamsCtrl.show)
router.post('/teams', teamsCtrl.create)

module.exports = router

