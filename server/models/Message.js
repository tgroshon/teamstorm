import _ from 'lodash'
import config from 'config'
import rdb from '../services/rdb-service'

var ATTRS = [
  'id',
  'creator',
  'payload',
  'category',
  'activityId',
  'createDate'
]

var PRIVATE_ATTRS = [
  'creator'
]

export default function Message (payload) {
  this.merge(payload)
}

Message.prototype.merge = function (data) {
  _.extend(this, _.pick(data, ATTRS))
}

Message.prototype.save = function (done) {
  Message.objects.insert(this, function (err, newMessageColl) {
    var newMess = newMessageColl.pop()
    _.extend(this, newMess)
    done(err)
  }.bind(this))
}

Message.prototype.toJson = function () {
  return _.pick(_.omit(this, PRIVATE_ATTRS), ATTRS)
}

Message.tableName = config.rdb.tables.messages

Message.objects = {
  insert (data, done) {
    rdb.insert(Message, data, done)
  },

  all (done) {
    rdb.all(Message, done)
  },

  getByActivity (activityId, done) {
    rdb.getByIndex(Message, 'activityId', activityId, done)
  },

  streamAll (activityId, listener, done) {
    rdb.streamMessages(Message, activityId, listener, done)
  }
}
