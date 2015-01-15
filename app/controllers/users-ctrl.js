'use strict'

var User = require('../models/User')

module.exports = {

  index: function(req, res) {
    User.objects.all(function (err, users) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      res.json({ 'users': users })
    })
  },

  create: function(req, res) {
    var user = new User(req.body)
    user.save(function() {
      res.json(user.toJson())
    })
  },

  streamIndex: function(req, res) {
    User.objects.streamAll(function(data) {
      res.emit(JSON.stringify(data), 'user')
    }, function(err) {
      console.log('Ending response', err.message)
      res.end()
    })
  }
}
