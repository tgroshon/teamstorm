import React from 'react'
import Router, {RouteHandler} from 'react-router'
import {Panel, Alert, Glyphicon, Badge} from 'react-bootstrap'
import ActionCreators from '../../action-creators'

var TeamBox = React.createClass({
  render() {
    return (
      <li key={this.props.team.id} className="TeamList__Item">
        <Link
          to="team"
          params={{teamId: this.props.team.id}}
          className="TeamList__ItemLink"
          >
          <Alert className="TeamList__ItemBox" bsStyle={style}>
            <h4>
              <Glyphicon glyph={icon} className="team__header-icon" />
              {this.props.team.title}
            </h4>
            <small>Status: {status}</small>
            <br />
            <small>Created on {createDate.toDateString()}</small>
          </Alert>
        </Link>
      </li>
    )
  }
})

export default React.createClass({

  render() {
    var teams = [].map((team) => {
      return <TeamBox key={team.id} team={team} />
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

