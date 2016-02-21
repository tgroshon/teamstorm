import Message from '../models/Message'
import Activity from '../models/Activity'
import Team from '../models/Team'

export default {

  index (req, res) {
    Team.objects.getByMembership(req.user.id, function (err, teams) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }

      if (!teams || teams.length === 0) {
        return res.json({ 'activities': [] })
      }

      var teamIds = teams.map(team => team.id)
      Activity.objects.getByTeamIds(teamIds, function (actErr, activities) {
        if (actErr) {
          return res.status(500).json({ errors: [{ msg: actErr.message }] })
        }

        res.json({
          'activities': activities.map(act => act.toJson())
        })
      })
    })
  },

  debug (req, res) {
    Activity.objects.all(function (err, activities) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }

      res.json({
        'activities': activities.map(act => act.toJson())
      })
    })
  },

  show (req, res) {
    Activity.objects.get(req.params.activityId, function (err, activity) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      res.json(activity.toJson())
    })
  },

  create (req, res) {
    var params = req.body
    delete params.id
    params.creatorId = req.user.id
    params.isActive = true

    var activity = new Activity(params)
    activity.save(() => {
      res.status(201).json(activity.toJson())
    })
  },

  update (req, res) {
    var params = req.body

    Team.objects.getByMembership(req.user.id, function (err, teams) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }

      var memberOfActivityTeam = (team) => team.id === params.teamId

      if (!teams.some(memberOfActivityTeam)) {
        return res.status(401).json({ errors: [{ msg: 'Permission denied to this Activity' }] })
      }

      delete params.createDate // No Updating the createDate

      // Only Creator can change Creator and Team
      if (req.user.id !== params.creator) {
        delete params.creator
        delete params.teamId
      }

      Activity.objects.get(params.id, function (err, activity) {
        if (err) {
          return res.status(500).json({ errors: [{ msg: err.message }] })
        }

        if (activity) {
          activity.merge(params)
          activity.save(() => {
            res.status(201).json(activity.toJson())
          })
        } else {
          res.status(404).json({ errors: [{ msg: 'No Activity Found' }] })
        }
      })
    })
  },

  messageIndex (req, res) {
    Message.objects.getByActivity(req.params.activityId, function (err, messages) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      res.json({ 'messages': messages })
    })
  },

  createMessage (req, res) {
    var params = {
      creator: req.user.id,
      payload: req.body.payload,
      activityId: req.params.activityId
    }

    if (req.body.category) {
      params.category = req.body.category
    }

    var message = new Message(params)
    message.save(() => {
      res.status(201).json(message.toJson())
    })
  },

  streamMessages (req, res) {
    Message.objects.streamAll(req.params.activityId, (data) => {
      res.emit(JSON.stringify(data), 'message')
    }, (err) => {
      if (err) {
        console.log('Ending response', err.msg)
      }
      res.end()
    })
  }
}
