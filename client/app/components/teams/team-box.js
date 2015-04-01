import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import Router, { Link } from 'react-router'

export default React.createClass({
  displayName: 'TeamBox',

  render() {
    var style = 'success'
    return (
      <li key={this.props.team.get('id')} className="TeamList__Item">
        <div className="ItemBox" bsStyle={style}>
          <Link to="team" params={{teamId: this.props.team.get('id')}}>
            <h4 className="ItemBox__Header">
              <Glyphicon glyph="user" className="ItemBox__Header__Icon" />
              {this.props.team.get('name')}
            </h4>
          </Link>
          <small>
            Size: {this.props.team.get('members').count()}
          </small>
        </div>
      </li>
    )
  }
})

