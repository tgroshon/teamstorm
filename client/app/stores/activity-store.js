import Immutable from 'immutable'
import { EventEmitter } from 'events'
import assign from 'object-assign'
import AppDispatcher from '../dispatcher'
import Constants from '../constants'

const ActivityConstants = Constants.Activity
const UserConstants = Constants.User

var activities = Immutable.Map()

var ActivityStore = assign({}, EventEmitter.prototype, {
  name: 'ActivityStore',

  get(activityId) {
    if (activities.has(activityId)) {
      return activities.get(activityId)
    } else {
      return null
    }
  },

  getAll() {
    return activities.toArray()
  }
})

ActivityStore.dispatchToken = AppDispatcher.register((payload) => {
  var params = payload.params

  switch(payload.type) {

    case ActivityConstants.STORE_ACTIVITIES:
      var newActivityMap = params.activities.reduce((map, act) => {
        return map.set(act.id, act)
      }, Immutable.Map())
      activities = activities.merge(newActivityMap)
      ActivityStore.emit('activity')
      break

    case UserConstants.LOGOUT:
      activities = Immutable.Map()
      break

    default:
      // do nothing
  }
})

export default ActivityStore

