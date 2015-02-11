import Marty from 'marty'
import { Activity as ActivityConstants } from '../constants'
import { Map as iMap } from 'immutable'
import StormHttpAPI from '../sources/storm-http-api'

export default Marty.createStore({
  name: 'Activity',

  getInitialState() {
    return {
      activities: iMap()
    }
  },

  handlers: {
    receiveActivities: ActivityConstants.RECEIVE_ACTIVITIES
  },

  receiveActivities(activities) {
    var newActivityMap = iMap()
    activities.forEach((act) => {
      newActivityMap = newActivityMap.set(act.id, act)
    })
    this.setState({
      activities: this.state.activities.merge(newActivityMap)
    })
  },

  get(activityId) {
    return this.fetch({
      id: activityId,
      locally: () => {
        if (this.state.activities.has(activityId)) {
          return this.state.activities.get(activityId)
        }
      },
      remotely: () => {
        return StormHttpAPI.fetchActivities()
      }
    })
  },

  getAll() {
    return this.fetch({
      id: 'activities',
      locally: () => {
        if (this.hasAlreadyFetched('activities')) {
          return this.state.activities.toArray()
        }
      },
      remotely: () => {
        return StormHttpAPI.fetchActivities()
      }
    })
  }
})
