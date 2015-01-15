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
    rdb.getConnection(function(err, conn) {
      if (err) return done(err)

      r.db(config.rdb.name)
        .table('users')
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
      r.db(config.rdb.name).table('users').run(conn, function(err, cursor) {
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
      r.db(config.rdb.name).table("users").changes().run(conn, function(err, cursor) {
        if (err) return done()

        console.log('Query succeeded')

        cursor.on("error", function(error) {
          console.log('Stream error called. Remove listeners')
          cursor.removeAllListeners()
          done(error)
        })

        cursor.on("data", function(message) {
          listener(message.new_val)
        })
      })
    })
  }
}

module.exports = User
