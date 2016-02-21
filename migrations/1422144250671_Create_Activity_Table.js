'use strict'

var config = require('config')
var r = require('rethinkdb')
var rdb = require('../server/services/rdb-service')

exports.up = function (next) {
  rdb.getConnection(function (err, connection) {
    if (err) return next(err)

    r.db(config.rdb.name).tableCreate(config.rdb.tables.activities, {primaryKey: 'id'}).run(connection, function (err, result) {
      next(err)
    })
  })
}

exports.down = function (next) {
  rdb.getConnection(function (err, connection) {
    if (err) return next(err)

    r.db(config.rdb.name).tableDrop(config.rdb.tables.activities).run(connection, function (err, result) {
      next(err)
    })
  })
}

