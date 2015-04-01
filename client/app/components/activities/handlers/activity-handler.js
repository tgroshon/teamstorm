import React from 'react'
import Router, { Link } from 'react-router'
import { Input } from 'react-bootstrap'
import ActivityStore from '../../../stores/activity-store'

export default React.createClass({
  mixins: [Router.State],

  getInitialState() {
    return {
      activity: ActivityStore.get(this.getParams().activityId),
      previousChanges: {},
      editing: false,
      httpError: null
    }
  },

  storeUpdate() {
    this.setState({
      activity: ActivityStore.get(this.getParams().activityId)
    })
  },

  componentWillMount() {
    ActivityStore.on('activity', this.storeUpdate)
  },

  componentWillUnmount() {
    ActivityStore.removeListener('activity', this.storeUpdate)
  },

  componentWillReceiveProps() {
    this.setState({
      activity: ActivityStore.get(this.getParams().activityId)
    })
  },

  handleSave() {

  },

  handleCancel() {
    this.setState({ editing: false })
  },

  handleEdit() {
    this.setState({ editing: true })
  },

  render() {
    var activity = this.state.activity
    if (!activity) {
      return <div />
    }

    var mapFn
    var actionButtons
    if (this.state.editing) {
      mapFn = (attr) => {
        switch(attr) {
          case 'type':
            return (
              <Input type="select" ref={attr + 'Input'} defaultValue="deliverable">
                <option value="deliverable">Deliverable</option>
                <option value="discussion">Discussion</option>
                <option value="issue">Issue</option>
              </Input>
            )

          case 'isActive':
            return (
              <Input type="select" ref={attr + 'Input'} defaultValue="true">
                <option value="true">True</option>
                <option value="false">False</option>
              </Input>
            )

          case 'isClosed':
            return (
              <Input type="select" ref={attr + 'Input'} defaultValue="true">
                <option value="true">True</option>
                <option value="false">False</option>
              </Input>
            )

          default:
            return <input type="text" ref={attr + 'Input'} className="form-control" defaultValue={activity[attr]} />
        }
      }
      actionButtons = [
        <button key="0" className="btn btn-primary action-btn" onClick={this.handleSave}>
          Save
        </button>,
        <button key="1" className="btn btn-danger action-btn" onClick={this.handleCancel}>
          Cancel
        </button>
      ]
    } else {
      mapFn = (attr) => {
        return <span>{activity[attr]}</span>
      }
      actionButtons = (
        <button className="btn btn-primary action-btn" onClick={this.handleEdit}>
          Edit
        </button>
      )
    }

    var ATTRIBUTES = ['title', 'type', 'isClosed']
    var dataCells = ATTRIBUTES.map(mapFn)

    return (
      <div className="container">
        <Link to="activities">Back</Link>
        <div className="row">
          <h2>{activity.title}</h2>
          <div className="col-md-6">
            <table className="table table-bordered">
              <tr>
                <td>Title</td>
                <td>
                  {dataCells[0]}
                </td>
              </tr>
              <tr>
                <td>Type</td>
                <td>
                  {dataCells[1]}
                </td>
              </tr>
              <tr>
                <td>Active</td>
                <td>
                  {dataCells[2]}
                </td>
              </tr>
            </table>
            <div className="form-group">
              {actionButtons}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

