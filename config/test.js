'use strict'

require('dotenv').load()

module.exports = {
  rdb: {
    name: process.env.RDB_DB || 'test',
    host: process.env.RDB_HOST || 'rdb',
    port: parseInt(process.env.RDB_PORT) || 28015,
    tables: {
      users: 'users',
      teams: 'teams',
      messages: 'messages',
      activities: 'activities',
    }
  },
  secrets: {
    authToken: process.env.AUTH_TOKEN_SECRET || 'testAuthToken'
  }
}

