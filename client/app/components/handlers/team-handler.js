import React from 'react'
import Router, { Link } from 'react-router'
import TeamStore from '../../stores/team-store'
import TeamActions from '../../actions/teams'

export default React.createClass({

  mixins: [Router.State],

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

  componentWillReceiveProps() {
    this.setState({
      team: TeamStore.get(this.getParams().teamId),
    })
  },

  componentWillUnmount() {
    TeamStore.removeListener('change', this.storeUpdate)
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

    return (
      <div>
        <h1>{team.get('name')}</h1>
        <ul>
          <strong>Members</strong>
          {memberItems}
        </ul>
        <a href={`/#/team/${team.get('id')}/edit`} className="btn btn-primary">
          Edit
        </a>
      </div>
    )
  }
})

