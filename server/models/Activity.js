'use strict'

var _ = require('lodash')
var config = require('config')
var r = require('rethinkdb')
var rdb = require('../services/rdb-service')

var ATTRS = [
  'id',
  'title',
  'type',
  'teamId',
  'isClosed',
  'creator',
  'createDate',
  'updateDate',
]

var PRIVATE_ATTRS = []

function Activity(payload) {
  var cleanAttrs = _.pick(payload, ATTRS)
  Object.keys(cleanAttrs).forEach(function(key) {
    this[key] = cleanAttrs[key]
  }.bind(this))
}

Activity.prototype.save = function(done) {
  Activity.objects.insert(this, function(err, newActivityColl) {
    var newActivity = newActivityColl.pop()
    _.extend(this, newActivity)
    done(err)
  }.bind(this))
}

Activity.prototype.toJson = function() {
  return _.omit(this, PRIVATE_ATTRS)
}

Activity.objects = {
  insert: function(data, done) {
    rdb.insert(config.rdb.tables.activities, data, done)
  }, 

  all: function(done) {
    rdb.getAll(config.rdb.tables.activities, done)
  },
}

module.exports = Activity
