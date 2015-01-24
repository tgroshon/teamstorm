import Marty from 'marty'
import { Activity as ActivityConstants } from '../constants'
import { List } from 'immutable'

export default Marty.createStore({
  name: 'Activity',

  getInitialState() {
    return {
      activities: List()
    }
  },

  handlers: {
    receiveActivities: ActivityConstants.RECEIVE_ACTIVITIES
  },

  receiveActivities(activities) {
    this.setState({
      activities: this.state.activities.concat(List(activities))
    })
  },

  getAll() {
    return this.fetch({
      id: 'activities',
      locally: () => {
        if (this.hasAlreadyFetched('activities')) {
          return this.state.activities
        }
      },
      remotely: () => {
        
      }
    })
  }
})
