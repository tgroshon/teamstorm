'use strict'

var jwt = require('jwt-simple')
var config = require('config')
var bcrypt = require('bcrypt')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

export function decode(token) {
  try {
    return jwt.decode(token, config.secrets.authToken)
  } catch (err) {
    return false
  }
}

export function encode(payload) {
  return jwt.encode(payload, config.secrets.authToken)
}

export function compare(password, hash, done) {
  bcrypt.compare(password, hash, done)
}

export function hash(password, done) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return done(err)
    bcrypt.hash(password, salt, done)
  })
}

export function initFacebookStrategy() {
	passport.use(new FacebookStrategy({
			clientID: config.oauth.facebook.clientID,
			clientSecret: config.oauth.facebook.clientSecret,
			callbackURL: config.oauth.facebook.callbackURL,
			passReqToCallback: true
		},
		function(req, accessToken, refreshToken, profile, done) {
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
				username: profile.username,
				provider: 'facebook',
				providerIdentifierField: 'id',
				providerData: providerData
			}

			// TODO Save the user OAuth profile
      console.log('Facebook Data', profile)
      console.log('Parsed Data', userProfile)
      console.log('Access Token', accessToken)
      console.log('refreshToken', accessToken)
      done(null, userProfile)
		}
	))
}
