import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import {Panel, Alert, Glyphicon, Badge} from 'react-bootstrap'

export default React.createClass({

  render() {
    return (
      <div>
        <h1>
          {this.props.team.title}
        </h1>
      </div>
    )
  }
})

