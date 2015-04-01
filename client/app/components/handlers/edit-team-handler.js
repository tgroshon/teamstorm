import React from 'react'
import Router, { Navigation } from 'react-router'
import TeamForm from '../views/team-form'
import TeamActions from '../../actions/teams'
import TeamStore from '../../stores/team-store'
import UserStore from '../../stores/user-store'

export default React.createClass({
  displayName: 'EditTeamHandler',

  mixins: [ Router.State, Navigation ],

  getInitialState() {
    return {
      team: TeamStore.get(this.getParams().teamId),
      user: UserStore.getUser()
    }
  },

  storeUpdate() {
    this.setState({
      team: TeamStore.get(this.getParams().teamId),
      user: UserStore.getUser()
    })
  },

  checkEditPermission() {
    if (this.state.user && this.state.team &&
        this.state.user.get('id') !== this.state.team.get('creatorId')) {
      return this.transitionTo('team', { teamId: this.state.team.get('id') })
    }
  },

  componentWillMount() {
    this.checkEditPermission()
    TeamStore.on('change', this.storeUpdate)
    UserStore.on('login', this.storeUpdate)
  },

  componentWillReceiveProps() {
    this.checkEditPermission()
  },

  componentWillUnmount() {
    TeamStore.removeListener('change', this.storeUpdate)
    UserStore.removeListener('login', this.storeUpdate)
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

    this.checkEditPermission()

		return (
      <div className="row">
        <h3>Edit Team</h3>
        <TeamForm
          ref="teamForm"
          user={this.state.user}
          team={this.state.team.toJS()}
          onCreate={this.handleCreate}
          onCancel={this.handleCancel} />
      </div>
		)
	}
})

