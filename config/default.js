'use strict';

module.exports = {
  rdb: {
    name: process.env.RDB_DB || 'storm',
    host: process.env.RDB_HOST || 'rdb',
    port: parseInt(process.env.RDB_PORT) || 28015,
    tables: [
      'messages',
      'cache',
      'users'
    ]
  }
};
