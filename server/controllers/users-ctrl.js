import User from '../models/User'
import authService from '../services/auth-service'

export default {

  search (req, res) {
    User.objects.search(req.query.q, function (err, users) {
      if (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
      }
      res.json({
        'users': users.map(user => user.toJson())
      })
    })
  },

  index (req, res) {
    if (req.query.users) {
      console.log('Multi')
      User.objects.multiGet(req.query.users, (err, users) => {
        if (err) {
          return res.status(500).json({ errors: [{ msg: err.message }] })
        }
        res.json({
          'users': users.map(user => user.toJson())
        })
      })
    } else {
      console.log('All')
      User.objects.all(function (err, users) {
        if (err) {
          return res.status(500).json({ errors: [{ msg: err.message }] })
        }
        res.json({
          'users': users.map(user => user.toJson())
        })
      })
    }
  },

  create (req, res) {
    var user = new User(req.body)
    user.hashPassword(req.body.password, function (err) {
      if (err) throw err
      user.save(function (err) {
        if (err) throw err
        user.token = authService.encode(user)
        res.json(user.toJson())
      })
    })
  },

  update (req, res) {
    var updatedUser = req.body
    if (req.user.id !== updatedUser.id) {
      return res.status(401).json({ errors: [{ msg: 'Cannot update other users' }] })
    }

    var newUser = new User(updatedUser)
    delete newUser.hash // Prevent Updating passwd hash here
    newUser.save(function (err) {
      if (err) throw err
      newUser.token = authService.encode(newUser)
      res.json(newUser.toJson())
    })
  },

  token (req, res) {
    res.json({ 'token': authService.encode(req.user.toJson()) })
  },

  redirectWithToken (req, res) {
    res.redirect('/#/oauth2redirect?token=' + authService.encode(req.user.toJson()))
  }
}
