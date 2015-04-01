import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import TeamActions from '../../../actions/teams'
import TeamStore from '../../../stores/team-store'
import TeamBox from '../team-box'

export default React.createClass({
  displayName: 'TeamHandler',

  getInitialState() {
    return {
      teams: []
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

  render() {
    var teams = this.state.teams.map(team => {
      return <TeamBox key={team.get('id')} team={team} />
    })

    return (
      <div>
        <ul className="Main__TeamList">
          {teams}
        </ul>
        <RouteHandler />
      </div>
    )
  }
})

