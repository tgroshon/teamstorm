'use strict'

var config = require('config')
var r = require('rethinkdb')
var rdb = require('./server/services/rdb-service')

function fixData() {
  rdb.getConnection(function(err, connection) {
    if (err) throw err

    r.db(config.rdb.name)
      .table(config.rdb.tables.messages)
      .update({activityId: 'bd94b175-3448-4de5-aa6f-6fde0ef60667'})
      .run(connection, function(err, result) {
        if (err) throw err
        console.log(result)
        connection.close()
      })
  })
}

function createActivity() {
  var activity = {
    title: 'First Activity',
    type: 'deliverable',
    isClosed: false,
    createDate: new Date(),
    updateDate: new Date()
  }
  rdb.insert(config.rdb.tables.activities, activity, function(err, results) {
    if (err) throw err

    console.log(results)
  })
}

fixData()
//createActivity()

console.log('Success!')
