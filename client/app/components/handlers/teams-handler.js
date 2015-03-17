import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import {Glyphicon, Badge} from 'react-bootstrap'
import TeamActions from '../../actions/teams'
import TeamStore from '../../stores/team-store'

var TeamBox = React.createClass({
  displayName: 'TeamBox',

  render() {
    var style = 'success'
    return (
      <li key={this.props.team.get('id')} className="TeamList__Item">
        <div className="TeamList__ItemBox" bsStyle={style}>
          <h4>
            <Glyphicon glyph="user" className="team__header-icon" />
            {this.props.team.get('name')}
          </h4>
        </div>
      </li>
    )
  }
})

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
    console.log(this.state.teams)
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

