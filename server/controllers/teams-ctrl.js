'use strict'

var Team = require('../models/Team')

module.exports = {

  index: function(req, res) {
    Team.objects.getByMembership(req.user.id, function (err, teams) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }

      res.json({
        'teams': teams.map(function(team) {
          return team.toJson()
        })
      })
    })
  },

  debug: function(req, res) {
    Team.objects.all(function (err, teams) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }

      res.json({
        'teams': teams.map(function(act) {
          return act.toJson()
        })
      })
    })
  },

  show: function(req, res) {
    Team.objects.get(req.params.teamId, function (err, team) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      
      res.json(team.toJson())
    })
  },

  create: function(req, res) {
    var team = new Team(req.body)
    team.save(function() {
      res.json(team.toJson())
    })
  },

}

