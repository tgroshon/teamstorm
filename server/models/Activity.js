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
  'isActive',
  'creator',
  'createDate',
  'updateDate',
]

var PRIVATE_ATTRS = []

function Activity(payload) {
  this.merge(payload)
}

Activity.prototype.merge = function(data) {
  _.extend(this, _.pick(data, ATTRS))
}

Activity.prototype.save = function(done) {
  Activity.objects.insert(this, function(err, newActivityColl) {
    var newActivity = newActivityColl.pop()
    _.extend(this, newActivity)
    done(err)
  }.bind(this))
}

Activity.prototype.toJson = function() {
  return _.pick(_.omit(this, PRIVATE_ATTRS), ATTRS)
}

Activity.tableName = config.rdb.tables.activities

Activity.objects = {
  insert: function(data, done) {
    rdb.insert(Activity, data, done)
  }, 

  all: function(done) {
    rdb.all(Activity, done)
  },

  get: function(id, done) {
    rdb.get(Activity, id, done)
  },

  getByTeamIds: function(teamIds, done) {
    if (!Array.isArray(teamIds) || teamIds.length === 0) {
      return done(null, [])
    }
    rdb.getByIndex(Activity, 'teamId', teamIds, done)
  }
}

module.exports = Activity
