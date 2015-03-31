import React from 'react'
import Router, { Navigation } from 'react-router'
import NewTeamForm from '../views/new-team-form'
import TeamActions from '../../actions/teams'
import TeamStore from '../../stores/team-store'

export default React.createClass({
  displayName: 'EditTeamHandler',

  mixins: [ Router.State, Navigation ],

  getInitialState() {
    return {
      team: TeamStore.get(this.getParams().teamId),
    }
  },

  storeUpdate() {
    this.setState({
      team: TeamStore.get(this.getParams().teamId),
    })
  },

  componentWillMount() {
    TeamStore.on('change', this.storeUpdate)
  },

  componentWillUnmount() {
    TeamStore.removeListener('change', this.storeUpdate)
  },

  handleCancel() {
    this.transitionTo('team', {teamId: this.getParams().teamId})
  },

  handleCreate() {
    var { name, members } = this.refs.teamForm.getFormData()
    TeamActions.editTeam(this.getParams().teamId, name, members)
    this.transitionTo('team', {teamId: this.getParams().teamId})
  },

	render() {
    if (!this.state.team) {
      return <div />
    }

		return (
      <div className="row">
        <h3>Edit Team</h3>
        <NewTeamForm
          ref="teamForm"
          team={this.state.team.toJS()}
          onCreate={this.handleCreate}
          onCancel={this.handleCancel} />
      </div>
		)
	}
})

