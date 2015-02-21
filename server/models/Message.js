'use strict'

var _ = require('lodash')
var config = require('config')
var r = require('rethinkdb')
var rdb = require('../services/rdb-service')

var ATTRS = [
  'id',
  'creator',
  'payload',
  'activityId',
  'createDate'
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
  return _.pick(_.omit(this, PRIVATE_ATTRS), ATTRS)
}

Message.tableName = config.rdb.tables.messages

Message.objects = {
  insert: function(data, done) {
    rdb.insert(Message, data, done)
  }, 

  all: function(done) {
    rdb.all(Message, done)
  },

  byActivity: function(activityId, done) {
    rdb.getByIndex(Message, 'activityId', activityId, done)
  },

  streamAll: function(activityId, listener, done) {
    rdb.streamMessages(Message, activityId, listener, done)
  }
}

module.exports = Message

