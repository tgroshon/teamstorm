import React from 'react'
import Router, { Link, Navigation } from 'react-router'
import UserStore from '../../../stores/user-store'
import TeamStore from '../../../stores/team-store'
import TeamActions from '../../../actions/teams'

export default React.createClass({

  mixins: [Router.State, Navigation],

  getInitialState() {
    return {
      team: TeamStore.get(this.getParams().teamId),
      user: UserStore.getUser(),
      showEditButton: false
    }
  },

  storeUpdate() {
    let user = UserStore.getUser()
    let team = TeamStore.get(this.getParams().teamId)
    let newState = !!team
      ? { user, team, showEditButton: this.shouldShowEditButton(user, team) }
      : { user }
    this.setState(newState)
  },

  shouldShowEditButton(user, team) {
    if (user && team && user.get('id') === team.get('creatorId')) {
      return true
    }
    return false
  },

  componentWillMount() {
    TeamStore.on('change', this.storeUpdate)
    UserStore.on('login', this.storeUpdate)
    this.storeUpdate()
  },

  componentWillReceiveProps() {
    let team = TeamStore.get(this.getParams().teamId)
    let user = UserStore.getUser()
    let showEditButton = this.shouldShowEditButton(user, team)
    this.setState({team, user, showEditButton})
  },

  componentWillUnmount() {
    TeamStore.removeListener('change', this.storeUpdate)
    UserStore.removeListener('login', this.storeUpdate)
  },

  render() {
    let team = this.state.team
    if (!team) {
      return <div />
    }

    let memberItems = team.get('members').map(member => {
      return (
        <li key={member.get('id')}>
          {member.get('firstName')} {member.get('lastName')} ({member.get('email')})
        </li>
      )
    }).toArray()

    let editButton = !this.state.showEditButton
      ? null
      : (
        <a href={`/#/team/${team.get('id')}/edit`} className="btn btn-primary">
          Edit
        </a>
      )

    return (
      <div>
        <h1>{team.get('name')}</h1>
        <ul>
          <strong>Members</strong>
          {memberItems}
        </ul>
        {editButton}
      </div>
    )
  }
})

