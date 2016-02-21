import _ from 'lodash'
import config from 'config'
import rdb from '../services/rdb-service'

var ATTRS = [
  'id',
  'title',
  'type',
  'categories',
  'teamId',
  'isActive',
  'creatorId',
  'createDate',
  'updateDate'
]

var PRIVATE_ATTRS = []

function Activity (payload) {
  this.merge(payload)
}

Activity.prototype.merge = function (data) {
  _.extend(this, _.pick(data, ATTRS))
}

Activity.prototype.save = function (done) {
  Activity.objects.insert(this, function (err, newActivityColl) {
    var newActivity = newActivityColl.pop()
    _.extend(this, newActivity)
    done(err)
  }.bind(this))
}

Activity.prototype.toJson = function () {
  return _.pick(_.omit(this, PRIVATE_ATTRS), ATTRS)
}

Activity.tableName = config.rdb.tables.activities

Activity.objects = {
  insert (data, done) {
    rdb.insert(Activity, data, done)
  },

  all (done) {
    rdb.all(Activity, done)
  },

  get (id, done) {
    rdb.get(Activity, id, done)
  },

  getByTeamIds (teamIds, done) {
    if (!Array.isArray(teamIds) || teamIds.length === 0) {
      return done(null, [])
    }
    rdb.getByIndex(Activity, 'teamId', teamIds, done)
  }
}

module.exports = Activity
