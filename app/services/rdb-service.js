'use strict';

var r = require('rethinkdb');
var config = require('config');
var RSVP = require('rsvp');

exports.getConnection = function getConnection(callback) {
  r.connect({host: config.rdb.host, port: config.rdb.port }, function (err, connection) {
    if (err) return callback(err);
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}

exports.setup = function(done) {
  exports.getConnection(function(err, connection) {
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
