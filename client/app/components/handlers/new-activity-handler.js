import React from 'react'
import {Input} from 'react-bootstrap'
import Router, { Navigation } from 'react-router'
import ActionCreators from '../../action-creators'

export default React.createClass({
  displayName: 'NewActivityHandler',
  
  mixins: [ Navigation ],

  handleCreate() {
    var title = this.refs.title.getValue()
    var type = this.refs.type.getValue()
    var team = this.refs.team.getValue()
  },

  handleCancel() {
    this.transitionTo('/activity')
  },

  render() {
    var teams = <option value="team1">My Team</option>
    return (
      <div className="input-group">
        <Input type="text" ref="title" label="Title" />
        <Input type="select" ref="type" label='Activity Type' defaultValue="deliverable">
          <option value="deliverable">Deliverable</option>
          <option value="discussion">Discussion</option>
          <option value="issue">Issue</option>
        </Input>
        <Input type="select" ref="team" label="Team">
          {teams}
        </Input>
        <button className="btn btn-success" onClick={this.handleCreate}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          Create
        </button>
        <button className="btn btn-danger" onClick={this.handleCancel}>
          <span className="glyphicon glyphicon-minus" aria-hidden="true" />
          Cancel
        </button>
      </div>
    )
  }
})
