import { Activity as ActivityConstants } from '../constants'
import Immutable from 'immutable'
import { EventEmitter } from 'events'
import assign from 'object-assign'
import AppDispatcher from '../dispatcher'

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
      var newActivityMap = Immutable.Map()
      params.activities.forEach((act) => {
        newActivityMap = newActivityMap.set(act.id, act)
      })
      activities = activities.merge(newActivityMap)
      ActivityStore.emit('activity')
      break

    default:
      // do nothing
  }
})

export default ActivityStore

