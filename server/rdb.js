'use strict';

var r = require('rethinkdb');
var config = require('config');
var RSVP = require('rsvp');

function getConnection(callback) {
  r.connect({host: config.rdb.host, port: config.rdb.port }, function (err, connection) {
    if (err) return callback(err);
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}

exports.getUsers = function (done) {
  getConnection(function(err, conn) {
    r.db(config.rdb.name).table('users').run(conn, function(err, cursor) {
      conn.close();
      if (err) return done(err);
      cursor.toArray(function(err, results) {
        if (err) return done(err);
        done(err, results);
      });
    }); 
  });
}

exports.setup = function(done) {
  getConnection(function(err, connection) {
    if (err) return done(err);

    r.dbCreate(config.rdb.name).run(connection, function(err, result) {
      var tablePromises = config.rdb.tables.map(function (tableName) {
        return new RSVP.Promise(function (resolve, reject) {
          r.db(config.rdb.name).tableCreate(tableName, {primaryKey: 'id'}).run(connection, function(err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      });

      RSVP.allSettled(tablePromises).then(function (data) {
        connection.close();
        done(data);
      });
    })
  });
};
