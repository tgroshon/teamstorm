'use strict'

var r = require('rethinkdb')
var config = require('config')
var _ = require('lodash')

function getConnection(done) {
  r.connect({
    host: config.rdb.host,
    port: config.rdb.port,
    authKey: config.rdb.authKey,
  }, function (err, connection) {
    if (err) return done(err)
    connection['_id'] = Math.floor(Math.random()*10001)
    done(err, connection)
  })
}

module.exports = {
  getConnection: getConnection,

  insert: function rdbServiceInsert(Klass, data, done) {
    getConnection(function(cErr, conn) {
      if (cErr) return done(cErr)

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
    getConnection(function(cErr, conn) {
      if (cErr) return done(cErr)
      r.db(config.rdb.name)
        .table(Klass.tableName)
        .run(conn, function(qErr, cursor) {
        if (qErr) {
          conn.close()
          return done(err)
        }
        cursor.toArray(function(err, results) {
          conn.close()
          if (err) return done(err)
          done(err, results.map(function(result) {
            return new Klass(result)
          }))
        })
      }) 
    })
  },

  get: function rdbServiceGet(Klass, key, done) {
    getConnection(function(cErr, conn) {
      if (cErr) return done(cErr)
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
    getConnection(function(cErr, conn) {
      if (cErr) return done(cErr)

      r.db(config.rdb.name)
      .table(Klass.tableName)
      .getAll(value, {index: index})
      .run(conn, function(err, cursor) {
        if (err) {
          conn.close()
          return done(err)
        }
        cursor.toArray(function(err, results) {
          conn.close()
          if (err) return done(err)
          done(err, results.map(function(result){
            return new Klass(result)
          }))
        })
      })
    })
  },

  searchUser: function rdbServiceSearchUser(Klass, fields, query, done) {
    getConnection(function(cErr, conn) {
      if (cErr) return done(cErr)

      r.db(config.rdb.name)
        .table(Klass.tableName)
        .filter(function(row) {
          // case insensitive, fuzzy search
          var pattern = '(?i)' + query.split('').join('\\w*')
          return r.or.apply(this, fields.map(function(field) {
            return row(field).match(pattern)
          }))
      }).run(conn, function(err, cursor) {
        if (err) return done(err)

        cursor.toArray(function(aErr, results){
          conn.close()
          done(aErr, results.map(function(result) {
            return new Klass(result)
          }))
        })
      })
    })

  },

  getByMembership: function rdbServiceGetByMembership(Klass, userId, done) {
    getConnection(function(conErr, conn) {
      if (conErr) return done(conErr)

      // TODO: Optimize with a multi-index
      // http://rethinkdb.com/docs/secondary-indexes/javascript/
      r.db(config.rdb.name)
        .table(Klass.tableName)
        .filter(r.row("members").contains(userId))
        .union(
          r.db(config.rdb.name)
            .table(Klass.tableName)
            .filter({creatorId: userId})
        ).run(conn, function(err, cursor) {
          if (err) {
            conn.close()
            return done(err)
          }

          cursor.toArray(function(arErr, results) {
            conn.close()
            if (!results) results = []
            done(arErr, results.map(function(result) {
              return new Klass(result)
            }))
          })
      })
    })
  },

  streamMessages: function rdbServiceStreamMessags(Klass, activityId, listener,
                                                   done) {
    getConnection(function(err, conn) {
      r.db(config.rdb.name)
        .table(Klass.tableName)
        .changes()
        .filter(r.row('new_val')('activityId').eq(activityId))
        .run(conn, function(err, feed) {
          if (err) return done(err)

          feed.on("error", function(error) {
            feed.removeAllListeners()
            conn.close()
            done(error)
          })

          feed.on("data", function(message) {
            listener(message.new_val)
          })
        })
    })
  }
}

