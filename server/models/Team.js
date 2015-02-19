'use strict'

var _ = require('lodash')
var config = require('config')
var r = require('rethinkdb')
var rdb = require('../services/rdb-service')
var authService = require('../services/auth-service')

var ATTRS = [
  'id',
  'name',
  'creatorId',
  'members'
]

var PRIVATE_ATTRS = [

]

function Team(payload) {
  var cleanAttrs = _.pick(payload, ATTRS)
  Object.keys(cleanAttrs).forEach(function(key) {
    this[key] = cleanAttrs[key]
  }.bind(this))
}

Team.prototype.save = function(done) {
  Team.objects.insert(this, function(err, newTeamColl) {
    var newTeam = newTeamColl.pop()
    _.extend(this, newTeam)
    done(err)
  }.bind(this))
}

Team.prototype.toJson = function() {
  return _.omit(this, PRIVATE_ATTRS)
}

Team.tableName = config.rdb.tables.teams

Team.objects = {
  insert: function(data, done) {
    rdb.insert(Team, data, done)
  }, 

  all: function(done) {
    rdb.all(Team, done)
  },

  get: function(id, done) {
    rdb.get(Team, id, done)
  },

  getByCreator: function(creatorId, done) {
    rdb.getByIndex(Team, 'creatorId', creatorId, done)
  },

  getByMembership: function(userId, done) {
    rdb.getByMembership(Team, userId, done)
  }
}

module.exports = Team

