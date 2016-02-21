import _ from 'lodash'
import config from 'config'
import rdb from '../services/rdb-service'
import authService from '../services/auth-service'

var ATTRS = [
  'id',
  'email',
  'firstName',
  'lastName',
  'hash',
  'token'
]

var PRIVATE_ATTRS = [
  'hash'
]

export default function User (payload) {
  this.merge(payload)
}

User.prototype.merge = function (data) {
  _.extend(this, _.pick(data, ATTRS))
}

User.prototype.save = function (done) {
  User.objects.insert(this, function (err, collection) {
    var instance = collection.pop()
    _.extend(this, instance)
    done(err)
  }.bind(this))
}

User.prototype.toJson = function () {
  return _.pick(_.omit(this, PRIVATE_ATTRS), ATTRS)
}

User.prototype.hashPassword = function (password, done) {
  authService.hash(password, function (err, hashedPassword) {
    if (err) return done(err)
    this.hash = hashedPassword
    done(err, this)
  }.bind(this))
}

User.tableName = config.rdb.tables.users

User.authenticate = function (email, password, done) {
  User.objects.getByEmail(email, function (err, userResults) {
    if (err || !userResults || userResults.length === 0) return done(err)
    var user = userResults.pop()
    authService.compare(password, user.hash, function (err, result) {
      if (err || !result) return done(err)
      done(err, user)
    })
  })
}

User.objects = {
  insert (data, done) {
    rdb.insert(User, data, done)
  },

  all (done) {
    rdb.all(User, done)
  },

  get (id, done) {
    rdb.get(User, id, done)
  },

  getByEmail (email, done) {
    rdb.getByIndex(User, 'email', email, done)
  },

  multiGet (userIds, done) {
    rdb.getByIndex(User, null, userIds, done)
  },

  search (query, done) {
    var fields = ['email', 'firstName', 'lastName']
    rdb.searchUser(User, fields, query, done)
  }
}
