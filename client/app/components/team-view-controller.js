import React from 'react'
import Router, {RouteHandler} from 'react-router'
import {Panel, Alert, Glyphicon, Badge} from 'react-bootstrap'
import ActionCreators from '../action-creators'

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

