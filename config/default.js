'use strict'

require('dotenv').load()

module.exports = {
  port: 3000,
  rdb: {
    name: process.env.RDB_DB || 'storm',
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
    authToken: process.env.AUTH_TOKEN_SECRET || 'd93nf90ao8wnb9sgzwr9h3l1]4'
  }
}

