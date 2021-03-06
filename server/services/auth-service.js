import jwt from 'jwt-simple'
import config from 'config'
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import User from '../models/User'

export function decode (token) {
  try {
    return jwt.decode(token, config.secrets.authToken)
  } catch (err) {
    return false
  }
}

export function encode (payload) {
  return jwt.encode(payload, config.secrets.authToken)
}

export function compare (password, hash, done) {
  bcrypt.compare(password, hash, done)
}

export function hash (password, done) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return done(err)
    bcrypt.hash(password, salt, done)
  })
}

export function initStrategies () {
  initFacebookStrategy()
  initGoogleStrategy()
}

function initFacebookStrategy () {
  var strategy = new FacebookStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret,
    callbackURL: config.oauth.facebook.callbackURL,
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    try {
      // Set the provider data and include tokens
      var providerData = profile._json
      providerData.accessToken = accessToken
      providerData.refreshToken = refreshToken
      // Create the user OAuth profile
      var userProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        facebookData: providerData
      }
      User.objects.getByEmail(userProfile.email, (err, users) => {
        if (err) return done(err)
        if (users.length === 0) {
          req.user = new User(userProfile)
          req.user.save((saveErr) => {
            done(saveErr, req.user)
          })
        } else {
          req.user = users.pop()
          done(null, req.user)
        }
      })
    } catch (e) {
      done(e)
    }
  })
  passport.use(strategy)
}

function initGoogleStrategy () {
  var strategy = new GoogleStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
    callbackURL: config.oauth.google.callbackURL,
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    try {
      // Set the provider data and include tokens
      var providerData = profile._json
      providerData.accessToken = accessToken
      providerData.refreshToken = refreshToken

      // Create the user OAuth profile
      var userProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        googleData: providerData
      }

      User.objects.getByEmail(userProfile.email, (err, users) => {
        if (err) return done(err)

        if (users.length === 0) {
          req.user = new User(userProfile)
          req.user.save((saveErr) => {
            done(saveErr, req.user)
          })
        } else {
          req.user = users.pop()
          done(null, req.user)
        }
      })
    } catch (e) {
      done(e)
    }
  })
  passport.use(strategy)
}
