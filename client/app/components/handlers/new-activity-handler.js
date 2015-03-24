import React from 'react'
import {Input} from 'react-bootstrap'
import Router, { Navigation } from 'react-router'
import TeamActions from '../../actions/teams'
import ActivityActions from '../../actions/activities'
import NewActivityForm from '../views/new-activity-form'
import TeamStore from '../../stores/team-store'

export default React.createClass({
  displayName: 'NewActivityHandler',
  
  mixins: [ Navigation ],

  getInitialState() {
    return {
      teams: TeamStore.getTeams()
    }
  },

  storeUpdate() {
    this.setState({
      teams: TeamStore.getTeams()
    })
  },

  componentWillMount() {
    TeamStore.on('change', this.storeUpdate)
    TeamActions.fetchTeams()
  },

  componentWillUnmount() {
    TeamStore.removeListener('change', this.storeUpdate)
  },

  handleCreate() {
    var {title, type, teamId, categories} = this.refs.newActivityForm.getFormData()
    ActivityActions.createActivity(title, type, teamId, categories)
  },

  handleCancel() {
    this.transitionTo('/activity')
  },

  render() {
    return (
      <div>
        <h3>New Activity</h3>
        <NewActivityForm
          ref='newActivityForm'
          handleCreate={this.handleCreate}
          handleCancel={this.handleCancel}
          teams={this.state.teams}
          />
      </div>
    )
  }
})
