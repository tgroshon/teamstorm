import { Activity as ActivityConstants } from '../constants'
import { Map as iMap } from 'immutable'
import { EventEmitter } from 'events'
import assign from 'object-assign'
import AppDispatcher from '../dispatcher'

var activities = iMap()

var ActivityStore = assign({}, EventEmitter.prototype, {
  name: 'Activity',

  receiveActivities(newActivities) {
    var newActivityMap = iMap()
    newActivities.forEach((act) => {
      newActivityMap = newActivityMap.set(act.id, act)
    })
    activities = activities.merge(newActivityMap)
    this.emit('activity')
  },

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

    case ActivityConstants.RECEIVE_ACTIVITIES:
      ActivityStore.receiveActivities(params.activities)
      break

    default:
      // do nothing
  }
})

export default ActivityStore

