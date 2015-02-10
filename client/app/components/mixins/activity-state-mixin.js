import Marty from 'marty'
import ActivityStore from '../stores/activity-store'

export default Marty.createStateMixin({
  listenTo: ActivityStore,
  getState() {
    return {
      activityResults: ActivityStore.getAll()
    }
  }
})

