'use strict'

var config = require('config')
var r = require('rethinkdb')
var rdb = require('../server/services/rdb-service')

var indexAttribute = 'email'

exports.up = function (next) {
  rdb.getConnection(function (err, connection) {
    if (err) return next(err)
    r.db(config.rdb.name).table(config.rdb.tables.users).indexCreate(indexAttribute).run(connection, function (err, result) {
      next(err)
    })
  })
}

exports.down = function (next) {
  rdb.getConnection(function (err, connection) {
    if (err) return next(err)

    r.db(config.rdb.name).table(config.rdb.tables.users).indexDrop(indexAttribute).run(connection, function (err, result) {
      next(err)
    })
  })
}

