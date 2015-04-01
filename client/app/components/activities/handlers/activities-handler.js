import React from 'react'
import Router, {RouteHandler} from 'react-router'
import ActivityStore from '../../../stores/activity-store'
import ActivityBox from '../activity-box'
import ActivityActions from '../../../actions/activities'

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
})
