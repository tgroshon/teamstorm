'use strict'

var jwt = require('jwt-simple')
var config = require('config')
var bcrypt = require('bcrypt')

module.exports = {
  decode: function(token) {
    try {
      return jwt.decode(token, config.secrets.authToken)
    } catch (err) {
      return false
    }
  },
  
  encode: function(payload) {
    return jwt.encode(payload, config.secrets.authToken)
  },

  compare: function(password, hash, done) {
    bcrypt.compare(password, hash, done)
  },

  hash: function(password, done) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return done(err)
      bcrypt.hash(password, salt, done)
    })
  },
}
