import React from 'react'
import { Glyphicon } from 'react-bootstrap'

export default React.createClass({
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

