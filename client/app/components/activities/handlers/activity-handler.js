import React from 'react'
import Router, { Link } from 'react-router'
import { Input } from 'react-bootstrap'
import ActivityStore from '../../../stores/activity-store'
import UserStore from '../../../stores/user-store'

export default React.createClass({
  mixins: [Router.State],

  getInitialState() {
    return {
      activity: ActivityStore.get(this.getParams().activityId),
      user: UserStore.getUser(),
      previousChanges: {},
      editing: false,
      httpError: null,
      shouldShowEdit: false
    }
  },

  getStateFromStores() {
    let user = this.state.user
    let activity = ActivityStore.get(this.getParams().activityId)
    let newState = !!activity
      ? { user, activity, shouldShowEdit: this.shouldShowEditButton(user, activity) }
      : { user }
    this.setState(newState)
  },

  componentWillMount() {
    ActivityStore.on('activity', this.getStateFromStores)
    this.getStateFromStores()
  },

  componentWillUnmount() {
    ActivityStore.removeListener('activity', this.getStateFromStores)
  },

  componentWillReceiveProps() {
    this.getStateFromStores()
  },

  shouldShowEditButton(user, activity) {
    if (user && activity && user.get('id') === activity.creatorId) {
      return true
    }
    return false
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
              <Input type="select" ref={attr + 'Input'} defaultValue={activity.type}>
                <option value="2col">2 Column</option>
                <option value="4x4">4x4 Grid</option>
                <option value="list">List</option>
              </Input>
            )

          case 'isActive':
            return (
              <Input type="select" ref={attr + 'Input'} defaultValue="true">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Input>
            )

          case 'isClosed':
            return (
              <Input type="select" ref={attr + 'Input'} defaultValue="true">
                <option value="true">Yes</option>
                <option value="false">No</option>
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
        let value = activity[attr]
        if (attr === 'isActive') {
          value = value ? 'Yes' : 'No'
        } else if (attr === 'type') {
          if (value === '2col') {
            value = '2 Column'
          } else if (value === '4x4') {
            value = '4x4 Grid'
          } else {
            value = 'List'
          }
        }
        return <span>{value}</span>
      }
      // TODO Enable Editing someday
      // if (this.state.shouldShowEdit) {
      //   actionButtons = (
      //     <button className="btn btn-primary action-btn" onClick={this.handleEdit}>
      //       Edit
      //     </button>
      //   )
      // }
    }

    var ATTRIBUTES = ['title', 'type', 'isActive']
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

