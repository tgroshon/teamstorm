'use strict'

var Message = require('../models/Message')

module.exports = {
  index: function(req, res) {
    Message.objects.all(function (err, messages) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      res.json({ 'messages': messages })
    })
  },

  create: function(req, res) {
    var message = new Message(req.body)
    message.save(function() {
      res.json(message.toJson())
    })
  },

  streamIndex: function(req, res) {
    Message.objects.streamAll(function(data) {
      res.emit(JSON.stringify(data), 'message')
    }, function(err) {
      console.log('Ending response', err.message)
      res.end()
    })
  }
}
