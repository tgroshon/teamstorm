import passport from 'passport'
import { decode } from '../services/auth-service'
import User from '../models/User'

export function passwordAuth (req, res, next) {
  User.authenticate(req.body.email, req.body.password, (err, user) => {
    if (err) return next(err)

    if (!user) {
      res.sendStatus(401)
    } else {
      req.user = user
      next()
    }
  })
}

export function tokenAuth (req, res, next) {
  var token = req.get('jwt')
  var result = decode(token)
  if (!result) {
    res.sendStatus(401)
  } else {
    req.user = new User(result)
    next()
  }
}

export function OAuth2 (provider) {
  return (req, res, next) => {
    var middleware = passport.authenticate(provider, err => {
      next(err)
    })
    middleware(req, res, next)
  }
}

export function stub (req, res) {
  res.sendStatus(200)
}
