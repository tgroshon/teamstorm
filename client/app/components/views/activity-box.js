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
    var isActive = this.props.activity.isActive === "false" ? false : true
    var statusMessage = isActive === "false" ? "Closed" : "Active"
    return (
      <li key={this.props.activity.id} className="ActivityList__Item">
          <div className="ActivityList__ItemBox">
          <Link to="activity"
            params={{activityId: this.props.activity.id}}
            className="ActivityList__ItemLink"
            >
              <h4 className={'text-'+ this.getBsStyle() + " ActivityList__ItemBoxHeader"}>
                <Glyphicon glyph={icon} className="activity__header-icon" />
                {this.props.activity.title}
              </h4>
            </Link>
            <small className={"text-" + (isActive ? 'success' : 'danger')}>
              Status: {statusMessage}
            </small>
            <br />
            <small>Created on {createDate.toDateString()}</small>
          <Link to="messages"
            params={{activityId: this.props.activity.id}}
            className="ActivityList__MessageLink"
            >
            <p>Messages</p>
          </Link>
          </div>
      </li>
    )
  }
})

