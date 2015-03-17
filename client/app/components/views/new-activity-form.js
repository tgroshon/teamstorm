import React from 'react'
import {Input} from 'react-bootstrap'

export default React.createClass({
  displayName: 'NewActivityForm',

  getActivity() {
    return {
      title: this.refs.title.getValue(),
      type: this.refs.type.getValue(),
      teamId: this.refs.team.getValue()
    }
  },

  render() {
    var teamOptions = this.props.teams.map(team => {
      return <option key={team.get('id')} value={team.get('id')}>{team.get('name')}</option>
    })
    return (
      <div className="input-group">
        <Input type="text" ref="title" label="Title" />
        <Input type="select" ref="type" label='Activity Type' defaultValue="deliverable">
          <option value="deliverable">Deliverable</option>
        </Input>
        <Input type="select" ref="team" label="Team">
          {teamOptions}
        </Input>
        <button className="btn btn-success action-btn" onClick={this.props.handleCreate}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          Create
        </button>
        <button className="btn btn-danger action-btn" onClick={this.props.handleCancel}>
          <span className="glyphicon glyphicon-minus" aria-hidden="true" />
          Cancel
        </button>
      </div>
    )
  }
})
