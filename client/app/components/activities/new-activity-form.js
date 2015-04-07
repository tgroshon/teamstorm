import React from 'react'
import {Input} from 'react-bootstrap'
import _ from 'lodash'
import ActivityBuilder from './activity-builder'

export default React.createClass({
  displayName: 'NewActivityForm',

  getInitialState() {
    return {
      isCustomType: false
    }
  },

  lookupTemplate() {
    var template = this.refs.template.getValue()
    if (template === 'deliverable') {
      return {
        type: '2col',
        categories: [
          {order: 1, value: "Is"},
          {order: 2, value: "Is Not"}
        ]
      }
    } else if (template === 'forum') {
      return {
        type: 'list',
        categories: null
      }
    } else if (template === 'swot') {
      return {
        type: '4x4',
        categories: [
          {order: 1, value: "Strengths"},
          {order: 2, value: "Weaknesses"},
          {order: 3, value: "Opportunities"},
          {order: 4, value: "Threats"},
        ]
      }
    } else if (template === 'procon') {
      return {
        type: '2col',
        categories: [
          {order: 1, value: "Pro"},
          {order: 2, value: "Con"},
        ]
      }
    }
  },

  getFormData() {
    var { type, categories } = this.state.isCustomType
      ? this.refs.builder.getFormData()
      : this.lookupTemplate()

    return {
      title: this.refs.title.getValue(),
      teamId: this.refs.team.getValue(),
      type,
      categories
    }
  },

  handleChange(event) {
    this.setState({
      isCustomType: this.refs.template.getValue() === 'custom'
    })
  },

  render() {
    var teamOptions = this.props.teams.map(team => {
      return <option key={team.get('id')} value={team.get('id')}>{team.get('name')}</option>
    })

    return (
      <div className="col-lg-6 form-group">
        <Input type="text" ref="title" label="Topic" />
        <Input type="select" ref="template" label='Template' onChange={this.handleChange} defaultValue="deliverable">
          <option value="deliverable">Deliverable</option>
          <option value="forum">Forum</option>
          <option value="swot">SWOT Analysis</option>
          <option value="procon">Pros and Cons</option>
          <option value="custom">Custom</option>
        </Input>
        <ActivityBuilder ref='builder' enabled={this.state.isCustomType} />
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
