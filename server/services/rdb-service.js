'use strict'

var r = require('rethinkdb')
var config = require('config')
var _ = require('lodash')

function getConnection(done) {
  r.connect({host: config.rdb.host, port: config.rdb.port }, function (err, connection) {
    if (err) return done(err)
    connection['_id'] = Math.floor(Math.random()*10001)
    done(err, connection)
  })
}

module.exports = {
  getConnection: getConnection,

  insert: function rdbServiceInsert(Klass, data, done) {
    getConnection(function(err, conn) {
      if (err) return done(err)

      var clonedData = _.clone(data)
      _.extend(clonedData, { createDate: r.now() })

      r.db(config.rdb.name)
        .table(Klass.tableName)
        .insert(clonedData, {conflict: 'update', returnChanges: true})
        .run(conn, function(dbErr, results) {
          conn.close()
          if (err) return done(err)

          var changedValues = results.changes.map(function(change) {
            return change['new_val']
          })
          done(err, changedValues)
        })
    })
  },

  all: function rdbServiceGetAll(Klass, done) {
    getConnection(function(err, conn) {
      r.db(config.rdb.name).table(Klass.tableName).run(conn, function(err, cursor) {
        conn.close()
        if (err) return done(err)
        cursor.toArray(function(err, results) {
          if (err) return done(err)
          done(err, results)
        })
      }) 
    })
  },

  get: function rdbServiceGet(Klass, key, done) {
    getConnection(function(err, conn) {
      r.db(config.rdb.name)
        .table(Klass.tableName)
        .get(key)
        .run(conn, function(err, data) {
          conn.close()
          if (err) return done(err)

          done(err, new Klass(data))
        })
    })
  },

  getByIndex: function rdbServiceGetByIndex(Klass, index, value, done) {
    getConnection(function(err, conn) {
      r.db(config.rdb.name)
      .table(Klass.tableName)
      .getAll(value, {index: index})
      .run(conn, function(err, cursor) {
        conn.close()
        if (err) return done(err)
        cursor.toArray(function(err, results) {
          if (err) return done(err)
          done(err, results)
        })
      })
    })
  }
}

