'use strict'

var _ = require('lodash')
var config = require('config')
var r = require('rethinkdb')
var rdb = require('../services/rdb-service')

var ATTRS = [
  'id',
  'creator',
  'payload'
]

var PRIVATE_ATTRS = [
  'creator'
]

function Message(payload) {
  var cleanAttrs = _.pick(payload, ATTRS)
  Object.keys(cleanAttrs).forEach(function(key) {
    this[key] = cleanAttrs[key]
  }.bind(this))
}

Message.prototype.save = function(done) {
  Message.objects.insert(this, function(err, newMessageColl) {
    var newMess = newMessageColl.pop()
    _.extend(this, newMess)
    done(err)
  }.bind(this))
}

Message.prototype.toJson = function() {
  return _.omit(this, PRIVATE_ATTRS)
}

Message.objects = {
  insert: function(data, done) {
    rdb.getConnection(function(err, conn) {
      if (err) return done(err)

      _.extend(data, { createDate: r.now() })

      r.db(config.rdb.name)
        .table('messages')
        .insert(data, {conflict: 'update', returnChanges: true})
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

  all: function(done) {
    rdb.getConnection(function(err, conn) {
      r.db(config.rdb.name).table('messages').run(conn, function(err, cursor) {
        conn.close()
        if (err) return done(err)
        cursor.toArray(function(err, results) {
          if (err) return done(err)
          done(err, results)
        })
      }) 
    })
  },

  streamAll: function(listener, done) {
    rdb.getConnection(function(err, conn) {
      r.db(config.rdb.name).table("messages").changes().run(conn, function(err, feed) {
        if (err) return done()

        console.log('Query succeeded')

        feed.on("error", function(error) {
          console.log('Stream error called. Remove listeners')
          feed.removeAllListeners()
          done(error)
        })

        feed.on("data", function(message) {
          console.log('stream message', JSON.stringify(message))
          listener(message.new_val)
        })
      })
    })
  }
}

module.exports = Message

