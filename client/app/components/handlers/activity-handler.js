import Marty from 'marty'
import React from 'react'
import Router from 'react-router'
import ActivityStore from '../../stores/activity-store'

var ActivityStateMixin = Marty.createStateMixin({
  listenTo: ActivityStore,
  getState() {
    var activityId = this.getParams().activityId
    return {
      activityResult: ActivityStore.get(activityId)
    }
  }
})

export default React.createClass({
  mixins: [Router.State, ActivityStateMixin],

  render() {
    return this.state.activityResult.when({
      pending() {
        return <div className="activity-loading">Loading...</div>
      },
      failed(error) {
        return <div className="activity-error">{error.message}</div>
      },
      done(activity) {
        return (
          <div>
            {activity.title}
          </div>
        )
      }
    })
  }
})

