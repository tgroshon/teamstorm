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

  token: function(req, res) {
    User.objects.getByEmail(req.body.email, function (err, users) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      res.json({ 'token': authService.encode(users.pop().toJson())})
    })
  },
}
