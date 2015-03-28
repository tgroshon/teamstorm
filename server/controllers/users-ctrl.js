'use strict'

var User = require('../models/User')
var authService = require('../services/auth-service')

module.exports = {

  search: function(req, res) {
    User.objects.search(req.query.q, function(err, users) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      res.json({
        'users': users.map(function(user) {
          return user.toJson()
        })
      })
    })
  },

  index: function(req, res) {
    if (req.query.users) {
      User.objects.multiGet(req.query.users, (err, users) => {
        if (err) {
          return res.status(500).json({ errors: [{ msg: err.message }] })
        }
        res.json({
          'users': users.map(function(user) {
            return user.toJson()
          })
        })
      })
    } else {
      User.objects.all(function (err, users) {
        if (err) {
          return res.status(500).json({ errors: [{ msg: err.message }] })
        }
        res.json({
          'users': users.map(function(user) {
            return user.toJson()
          })
        })
      })
    }
  },

  create: function(req, res) {
    var user = new User(req.body)
    user.hashPassword(req.body.password, function(err) {
      if (err) throw err
      user.save(function(err) {
        if (err) throw err
        user.token = authService.encode(user)
        res.json(user.toJson())
      })
    })
  },

  update: function(req, res) {
    var updatedUser = req.body
    if (req.user.id !== updatedUser.id) {
      return res.status(401).json({ errors: [{ msg: 'Cannot update other users'}] })
    }

    var newUser = new User(updatedUser)
    delete newUser.hash // Prevent Updating passwd hash here
    newUser.save(function(err) {
      if (err) throw err
      newUser.token = authService.encode(newUser)
      res.json(newUser.toJson())
    })
  },

  token: function(req, res) {
    res.json({ 'token': authService.encode(req.user.toJson())})
  },
}
