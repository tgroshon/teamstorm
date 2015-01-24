import React from 'react'
import Marty from 'marty'
import ActivityStore from '../stores/activity-store'

var ActivityStateMixin = Marty.createStateMixin({
  listenTo: ActivityStore,
  getState() {
    return {

    }
  }
})

export default React.createClass({
  mixins: [ActivityStateMixin],
  render() {
    return <h1>Activity</h1>
  }
})
