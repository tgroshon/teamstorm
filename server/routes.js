'use strict'

var express = require('express')
var router = express.Router()
var usersCtrl = require('./controllers/users-ctrl')
var activityCtrl = require('./controllers/activity-ctrl')
var sseMiddleware = require('./middlewares/sse-response')

router.get('/users', usersCtrl.index)
router.post('/users', usersCtrl.create)


router.get('/activity/:activityId', activityCtrl.show)
router.post('/activity', activityCtrl.create)
router.get('/activity/:activityId/messages/stream', sseMiddleware, activityCtrl.streamMessages)
router.get('/activity/:activityId/messages', activityCtrl.messageIndex)
router.post('/activity/:activityId/messages', activityCtrl.createMessage)

module.exports = router

