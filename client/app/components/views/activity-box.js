import React from 'react'
import {Panel, Alert, Glyphicon, Badge} from 'react-bootstrap'
import ActionConstants, {strings as StringConstants} from '../../constants'
import Router, {Link} from 'react-router'

export default React.createClass({
  getIcon() {
    switch(this.props.activity.type){
      case StringConstants.types.activity.deliverable:
        return "th"
        break;
      case StringConstants.types.activity.discussion:
        return "list-alt"
        break;
      case StringConstants.types.activity.issue:
        return "bullhorn"
        break;
      default:
        return
    }
  },

  getBsStyle() {
    switch(this.props.activity.type){
      case StringConstants.types.activity.deliverable:
        return "success"
        break;
      case StringConstants.types.activity.discussion:
        return "warning"
        break;
      case StringConstants.types.activity.issue:
        return "danger"
        break;
      default:
        return "default"
    }
  },

  render() {
    var icon = this.getIcon()
    var style = this.getBsStyle()
    var createDate = new Date(this.props.activity.createDate)
    var status = this.props.activity.isClosed === "false" ? "Closed" : "Active"
    return (
      <li key={this.props.activity.id} className="ActivityList__Item">
        <Link
          to="messages"
          params={{activityId: this.props.activity.id}}
          className="ActivityList__ItemLink"
          >
          <div className="ActivityList__ItemBox">
            <h4 className={'text-'+ this.getBsStyle() + " ActivityList__ItemBoxHeader"}>
              <Glyphicon glyph={icon} className="activity__header-icon" />
              {this.props.activity.title}
            </h4>
            <small>Status: {status}</small>
            <br />
            <small>Created on {createDate.toDateString()}</small>
          </div>
        </Link>
      </li>
    )
  }
})

