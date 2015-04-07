import React from 'react'
import {Input} from 'react-bootstrap'
import _ from 'lodash'
import ActivityBuilder from './activity-builder'
import {ErrorMessage, Placeholder} from '../common/form-helpers'

function lookupTemplate(template) {
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
}

export default React.createClass({
  displayName: 'NewActivityForm',

  getInitialState() {
    return {
      isCustomType: false,
      errors: {}
    }
  },

  lookupTemplateFromForm() {
    return lookupTemplate(this.refs.template.getValue())
  },

  getFormData() {
    var { type, categories } = this.state.isCustomType
      ? this.refs.builder.getFormData()
      : this.lookupTemplateFromForm()

    return {
      title: this.refs.title.getValue(),
      teamId: this.refs.team.getValue(),
      type,
      categories
    }
  },

  isValidForm() {
    var errors = {}
    var isValid = true

    if (!this.refs.team.getValue()) {
      errors.teamErrorMsg = 'No Team Selected'
      isValid = false
    }

    if (!this.refs.title.getValue()) {
      errors.titleErrorMsg = 'No Topic Selected'
      isValid = false
    }

    if (!isValid) {
      this.setState({errors})
    }

    return isValid
  },

  handleCreate(event) {
    if (this.isValidForm()) {
      this.props.handleCreate(event)
    }
  },

  handleChange(event) {
    this.setState({
      isCustomType: this.refs.template.getValue() === 'custom'
    })
  },

  getErrorMessages() {
    var {teamErrorMsg, titleErrorMsg} = this.state.errors
    return {
      teamError: teamErrorMsg ? <ErrorMessage msg={teamErrorMsg} /> : <Placeholder />,
      titleError: titleErrorMsg ? <ErrorMessage msg={titleErrorMsg} /> : <Placeholder />
    }
  },

  render() {
    var teamOptions = this.props.teams.map(team => {
      return <option key={team.get('id')} value={team.get('id')}>{team.get('name')}</option>
    })

    var {teamError, titleError} = this.getErrorMessages()

    return (
      <div className="row">
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
          <button className="btn btn-success action-btn" onClick={this.handleCreate}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
            Create
          </button>
          <button className="btn btn-danger action-btn" onClick={this.props.handleCancel}>
            <span className="glyphicon glyphicon-minus" aria-hidden="true" />
            Cancel
          </button>
        </div>
        <div className="col-lg-6">
          {titleError}
          <Placeholder />
          {teamError}
        </div>
      </div>
    )
  }
})
