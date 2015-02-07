'use strict'

var express = require('express')
var router = express.Router()
var usersCtrl = require('./controllers/users-ctrl')
var activityCtrl = require('./controllers/activity-ctrl')
var sseMiddleware = require('./middlewares/sse-response')
var authMiddleware = require('./middlewares/authentication')

router.get('/users', usersCtrl.index)
router.post('/users', usersCtrl.create)

router.post('/login', authMiddleware.passwordAuth, authMiddleware.stub)
router.get('/token', authMiddleware.tokenAuth, authMiddleware.stub)

router.get('/activity/:activityId', activityCtrl.show)
router.get('/activity', activityCtrl.index)
router.post('/activity', activityCtrl.create)
router.get('/activity/:activityId/messages/stream', sseMiddleware, activityCtrl.streamMessages)
router.get('/activity/:activityId/messages', activityCtrl.messageIndex)
router.post('/activity/:activityId/messages', activityCtrl.createMessage)

module.exports = router

