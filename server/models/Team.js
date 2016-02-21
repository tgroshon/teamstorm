import _ from 'lodash'
import config from 'config'
import rdb from '../services/rdb-service'

var ATTRS = [
  'id',
  'name',
  'creatorId',
  'members'
]

var PRIVATE_ATTRS = [

]

export default function Team (payload) {
  this.merge(payload)
}

Team.prototype.merge = function (data) {
  _.extend(this, _.pick(data, ATTRS))
}

Team.prototype.save = function (done) {
  Team.objects.insert(this, function (err, newTeamColl) {
    var newTeam = newTeamColl.pop()
    _.extend(this, newTeam)
    done(err)
  }.bind(this))
}

Team.prototype.toJson = function () {
  return _.pick(_.omit(this, PRIVATE_ATTRS), ATTRS)
}

Team.tableName = config.rdb.tables.teams

Team.objects = {
  insert (data, done) {
    rdb.insert(Team, data, done)
  },

  all (done) {
    rdb.all(Team, done)
  },

  get (id, done) {
    rdb.getTeam(Team, id, done)
  },

  getByCreator (creatorId, done) {
    rdb.getByIndex(Team, 'creatorId', creatorId, done)
  },

  getByMembership (userId, done) {
    rdb.getByMembership(Team, userId, done)
  }
}
