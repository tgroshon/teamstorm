'use strict'

var _ = require('lodash')
var config = require('config')
var r = require('rethinkdb')
var rdb = require('../services/rdb-service')
var authService = require('../services/auth-service')

var ATTRS = [
  'id',
  'email',
  'firstName',
  'lastName',
  'hash'
]

var PRIVATE_ATTRS = [
  'hash'
]

function User(payload) {
  var cleanAttrs = _.pick(payload, ATTRS)
  Object.keys(cleanAttrs).forEach(function(key) {
    this[key] = cleanAttrs[key]
  }.bind(this))
}

User.prototype.save = function(done) {
  User.objects.insert(this, function(err, collection) {
    var instance = collection.pop()
    _.extend(this, instance)
    done(err)
  }.bind(this))
}

User.prototype.toJson = function() {
  return _.omit(this, PRIVATE_ATTRS)
}

User.prototype.hashPassword = function(password, done) {
  authService.hash(password, function(err, hashedPassword) {
    if (err) return done(err)
    this.hash = hashedPassword
    done(err, this)
  }.bind(this))
}

User.tableName = config.rdb.tables.users

User.authenticate = function(email, password, done) {
  User.objects.getByEmail(email, function(err, userResults) {
    var user = userResults.pop()
    if (err || !user) return done(err)
    authService.compare(password, user.hash, function (err, result) {
      if (err || !result) return done(err)
      done(err, user)
    })
  })
}

User.objects = {
  insert: function(data, done) {
    rdb.insert(User, data, done)
  }, 

  all: function(done) {
    rdb.all(User, done)
  },

  get: function(id, done) {
    rdb.get(User, id, done)
  },

  getByEmail: function(email, done) {
    rdb.getByIndex(User, 'email', email, done)
  },

  search: function(input, done) {
    rdb.getConnection(function(cErr, conn) {
      if (cErr) return done(cErr)

      r.db(config.rdb.name)
        .table(User.tableName)
        .filter(function(user) {
          // case insensitive, fuzzy search
          var query = '(?i)' + input.split('').join('\\w*')
          return r.or(
            user("email").match(query),
            user("firstName").match(query),
            user("lastName").match(query)
          )
      }).run(conn, function(err, cursor) {
        if (err) return done(err)

        cursor.toArray(function(aErr, results){
          conn.close()
          done(aErr, results.map(function(result) {
            return new User(result)
          }))
        })
      })
    })
  },
}

module.exports = User

