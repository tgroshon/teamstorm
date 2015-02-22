'use strict'

var Message = require('../models/Message')
var Activity = require('../models/Activity')

module.exports = {

  index: function(req, res) {
    Activity.objects.all(function (err, activities) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }

      res.json({
        'activities': activities.map(function(act) {
          return act.toJson()
        })
      })
    })
  },

  show: function(req, res) {
    Activity.objects.get(req.params.activityId, function (err, activity) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      
      res.json(activity.toJson())
    })
  },

  create: function(req, res) {
    var activity = new Activity(req.body)
    activity.save(function() {
      res.json(activity.toJson())
    })
  },

  messageIndex: function(req, res) {
    Message.objects.getByActivity(req.params.activityId, function (err, messages) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      res.json({ 'messages': messages })
    })
  },

  createMessage: function(req, res) {
    var message = new Message(req.body)
    message.save(function() {
      res.json(message.toJson())
    })
  },

  streamMessages: function(req, res) {
    Message.objects.streamAll(req.params.activityId, function(data) {
      res.emit(JSON.stringify(data), 'message')
    }, function(err) {
      if (err) {
        console.log('Ending response', err.msg)
      }
      res.end()
    })
  }
}
