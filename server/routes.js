'use strict'

var express = require('express')
var router = express.Router()
var usersCtrl = require('./controllers/users-ctrl')
var messagesCtrl = require('./controllers/messages-ctrl')
var sseMiddleware = require('./middlewares/sse-response')

router.get('/users/stream', sseMiddleware, usersCtrl.streamIndex)
router.get('/users', usersCtrl.index)
router.post('/users', usersCtrl.create)

router.get('/messages/stream', sseMiddleware, messagesCtrl.streamIndex)

router.get('/activity/:activityId/messages', messagesCtrl.index)
router.post('/activity/:activityId/messages', messagesCtrl.create)

module.exports = router
