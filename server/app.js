'use strict'
require('babel/register')({
  experimental: true
})
var config = require('config')
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var AuthService = require('./services/auth-service')
var routes = require('./routes')

AuthService.initStrategies()

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(express.static('./public'))
app.use(routes)

var server = app.listen(config.port, function () {
  var port = server.address().port
  console.log('App listening on Port %s', port)
})

module.exports = server
