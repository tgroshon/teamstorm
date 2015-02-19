import React from 'react'
import Router from 'react-router'
import ActivityStore from '../../stores/activity-store'

export default React.createClass({
  mixins: [Router.State],

  getInitialState() {
    return {
      activity: {}
    }
  },

  storeUpdate() {
    this.setState({
      activity: ActivityStore.get(this.getParams().activityId)
    })
  },

  componentWillMount() {
    ActivityStore.on('activity', this.storeUpdate)
  },

  componentWillUnmount() {
    ActivityStore.removeListener('activity', this.storeUpdate)
  },

  render() {
    return (
      <div>
        {this.state.activity.title}
      </div>
    )
  }
})

