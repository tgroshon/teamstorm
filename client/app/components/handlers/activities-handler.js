import React from 'react'
import Router, {RouteHandler} from 'react-router'
import ActivityStore from '../../stores/activity-store'
import ActivityBox from '../views/activity-box'
import ActivityActions from '../../actions/activities'

export default React.createClass({
  getInitialState() {
    return {
      activities: []
    }
  },

  storeUpdate() {
    this.setState({ activities: ActivityStore.getAll()})
  },

  componentWillMount() {
    ActivityStore.on('activity', this.storeUpdate)
    ActivityActions.fetchActivities()
  },

  componentWillUnmount() {
    ActivityStore.removeListener('activity', this.storeUpdate)
  },

  render() {
    if (this.state.activities.length == 0) {
      return <div className="activities-loading">Loading...</div>
    } else {
      var boxes = this.state.activities.map((act) => {
        return <ActivityBox key={act.id} activity={act} />
      })

      return (
        <div>
          <ul className="Main__ActivityList">
            {boxes}
          </ul>
          <RouteHandler />
        </div>
      )
    }
  }
})
