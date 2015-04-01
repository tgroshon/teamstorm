import React from 'react'
import Router, { Navigation } from 'react-router'
import TeamForm from '../team-form'
import TeamActions from '../../../actions/teams'

export default React.createClass({
  displayName: 'NewTeamHandler',

  mixins: [ Navigation ],

  handleCancel() {
    this.transitionTo('/team')
  },


  handleCreate() {
    var { name, members } = this.refs.userAutocomplete.getFormData()
    TeamActions.createTeam(name, members)
    this.transitionTo('/team')
  },

	render() {
		return (
      <div className="row">
        <h3>New Team</h3>
        <TeamForm
          ref="userAutocomplete"
          onCreate={this.handleCreate}
          onCancel={this.handleCancel} />
      </div>
		)
	}
})

