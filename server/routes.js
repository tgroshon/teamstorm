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

// TODO remove.  For testing only
router.get('/token', authMiddleware.tokenAuth, authMiddleware.stub)

router.get('/activity/:activityId',
            authMiddleware.tokenAuth,
            activityCtrl.show)
router.get('/activity',
            authMiddleware.tokenAuth,
            activityCtrl.index)
router.post('/activity',
            authMiddleware.tokenAuth,
            activityCtrl.create)
router.get('/activity/:activityId/messages',
            authMiddleware.tokenAuth,
            activityCtrl.messageIndex)
router.post('/activity/:activityId/messages',
            authMiddleware.tokenAuth,
            activityCtrl.createMessage)
router.get('/activity/:activityId/messages/stream', sseMiddleware, activityCtrl.streamMessages)

router.get('/teams',
           authMiddleware.tokenAuth,
           teamsCtrl.index)
router.get('/teams/:teamId',
           authMiddleware.tokenAuth,
           teamsCtrl.show)
router.post('/teams',
           authMiddleware.tokenAuth,
            teamsCtrl.create)

// TODO For testing only
router.get('/teams/debug', teamsCtrl.debug)

module.exports = router

