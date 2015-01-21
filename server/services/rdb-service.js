'use strict'

var r = require('rethinkdb')
var config = require('config')
var RSVP = require('rsvp')

exports.getConnection = function getConnection(callback) {
  r.connect({host: config.rdb.host, port: config.rdb.port }, function (err, connection) {
    if (err) return callback(err)
    connection['_id'] = Math.floor(Math.random()*10001)
    callback(err, connection)
  })
}

