'use strict'

var _ = require('lodash')
var config = require('config')
var r = require('rethinkdb')
var rdb = require('../services/rdb-service')

var ATTRS = [
  'id',
  'email',
  'firstName',
  'lastName',
  'password'
]

var PRIVATE_ATTRS = [
  'password'
]

function User(payload) {
  var cleanAttrs = _.pick(payload, ATTRS)
  Object.keys(cleanAttrs).forEach(function(key) {
    this[key] = cleanAttrs[key]
  }.bind(this))
}

User.prototype.save = function(done) {
  User.objects.insert(this, function(err, newUserColl) {
    var newUser = newUserColl.pop()
    _.extend(this, newUser)
    done(err)
  }.bind(this))
}

User.prototype.toJson = function() {
  return _.omit(this, PRIVATE_ATTRS)
}

User.objects = {
  insert: function(data, done) {
    rdb.insert(config.rdb.tables.users, data, done)
  }, 

  all: function(done) {
    rdb.getAll(config.rdb.tables.users, done)
  },
}

module.exports = User

