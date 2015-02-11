import React from 'react'
import Marty from 'marty'
import ActivityStore from '../stores/activity-store'
import ActivityBox from './views/activity-box'
import Router, {RouteHandler} from 'react-router'

var ActivityStateMixin = Marty.createStateMixin({
  listenTo: ActivityStore,
  getState() {
    return {
      activityResults: ActivityStore.getAll()
    }
  }
})

export default React.createClass({
  mixins: [ActivityStateMixin],
  render() {
    return this.state.activityResults.when({
      pending() {
        return <div className="activities-loading">Loading...</div>
      },
      failed(error) {
        return <div className="activities-error">{error.message}</div>
      },
      done(activities) {
        var boxes = activities.map((act) => {
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
  }
})
