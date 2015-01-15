'use strict'

var express = require('express')
var router = express.Router()
var usersCtrl = require('./controllers/users-ctrl')
var messagesCtrl = require('./controllers/messages-ctrl')
var sseMiddleware = require('./middlewares/sse-response')

router.get('/events', sseMiddleware, messagesCtrl.eventStream)
router.get('/users', usersCtrl.index)
router.post('/users', usersCtrl.create)

module.exports = router
