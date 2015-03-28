'use strict'

require('dotenv').load()

module.exports = {
  port: 3000,
  rdb: {
    name: process.env.RDB_DB || 'storm',
    host: process.env.RDB_HOST || 'rdb',
    authKey: process.env.RDB_AUTH_KEY || 'devAuthKey',
    port: parseInt(process.env.RDB_PORT) || 28015,
    tables: {
      users: 'users',
      teams: 'teams',
      messages: 'messages',
      activities: 'activities',
    }
  },
  oauth: {
    google: {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL
    },
    facebook: {
      clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_OAUTH_CALLBACK_URL
    }
  },
  secrets: {
    authToken: process.env.AUTH_TOKEN_SECRET || 'd93nf90ao8wnb9sgzwr9h3l1]4'
  }
}

