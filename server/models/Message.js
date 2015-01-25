'use strict'

var _ = require('lodash')
var config = require('config')
var r = require('rethinkdb')
var rdb = require('../services/rdb-service')

var ATTRS = [
  'id',
  'creator',
  'payload',
  'activityId'
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
    rdb.insert(config.rdb.tables.messages, data, done)
  }, 

  all: function(done) {
    rdb.getAll(config.rdb.tables.messages, done)
  },

  streamAll: function(listener, done) {
    rdb.getConnection(function(err, conn) {
      r.db(config.rdb.name).table(config.rdb.tables.activities).changes().run(conn, function(err, feed) {
        if (err) return done()

        feed.on("error", function(error) {
          console.log('Stream error called. Remove listeners')
          feed.removeAllListeners()
          done(error)
        })

        feed.on("data", function(message) {
          listener(message.new_val)
        })
      })
    })
  }
}

module.exports = Message

