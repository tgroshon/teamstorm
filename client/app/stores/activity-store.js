import Marty from 'marty'
import { Activity as ActivityConstants } from '../constants'
import { List, Map } from 'immutable'
import StormHttpAPI from '../sources/storm-http-api'

export default Marty.createStore({
  name: 'Activity',

  getInitialState() {
    return {
      activities: Map()
    }
  },

  handlers: {
    receiveActivities: ActivityConstants.RECEIVE_ACTIVITIES
  },

  receiveActivities(activities) {
    console.log('Store, receiving activities')
    var newActivityMap = Map()
    activities.forEach((act) => {
      newActivityMap = newActivityMap.set(act.id, act)
    })
    console.log('Store, setting state of received activities')
    console.log(newActivityMap.toArray())
    this.setState({
      activities: this.state.activities.merge(newActivityMap)
    })
  },

  get(activityId) {
    console.log('Store, getById')
    return this.fetch({
      id: activityId,
      locally: () => {
        if (this.hasAlreadyFetched(activityId)) {
          return this.state.activities.get(activityId)
        }
      },
      remotely: () => {
        // return the promise
        return StormHttpAPI.fetchActivities()
      }
    })
  },

  getAll() {
    console.log('Store, get all')
    return this.fetch({
      id: 'activities',
      locally: () => {
        if (this.hasAlreadyFetched('activities')) {
          return this.state.activities.toArray()
        }
      },
      remotely: () => {
        // return the promise
        console.log('API Fetch')
        return StormHttpAPI.fetchActivities()
      }
    })
  }
})
