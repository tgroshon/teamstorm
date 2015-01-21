'use strict'

var jwt = require('jwt-simple')
var config = require('config')

module.exports = {
  decode: function(token) {
    return jwt.decode(token, config.secrets.authToken)
  },
  
  encode: function(payload) {
    return jwt.encode(payload, config.secrets.authToken)
  }
}
