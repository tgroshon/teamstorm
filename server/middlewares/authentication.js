'use strict'

var authService = require('../services/auth-service')
var User = require('../models/User')

module.exports = {
  
  passwordAuth: function(req, res, next) {
    User.authenticate(req.body.email, req.body.password, function(err, user) {
      if (err) return next(err)

      if (!user) {
        res.sendStatus(401)
      } else {
        req.user = user
        next()
      }
    })
  },

  tokenAuth: function(req, res, next) {
    var token = req.get('jwt')
    var result = authService.decode(token)
    if (!result) {
      res.sendStatus(401)
    } else {
      req.user = new User(result)
      next()
    }
  },

  stub: function(req, res) {
    res.sendStatus(200)
  }
}
