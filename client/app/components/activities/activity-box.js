import React from 'react'
import {Panel, Alert, Glyphicon, Badge} from 'react-bootstrap'
import { ActivityTypes } from '../../constants'
import Router, {Link} from 'react-router'

export default React.createClass({
  getIcon() {
    switch(this.props.activity.type){
      case ActivityTypes['2col']:
        return "th-list"
        break;
      case ActivityTypes['4x4']:
        return "th-large"
        break;
      case ActivityTypes.list:
        return "list-alt"
        break;
      default:
        return
    }
  },

  getBsStyle() {
    switch(this.props.activity.type){
      case ActivityTypes['2col']:
        return "success"
        break;
      case ActivityTypes['4x4']:
        return "warning"
        break;
      case ActivityTypes.list:
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
        <div className="ItemBox">
          <Link to="activity" params={{activityId: this.props.activity.id}}>
            <h4 className={'text-'+ this.getBsStyle() + " ItemBox__Header"}>
              <Glyphicon glyph={icon} className="ItemBox__Header__Icon" />
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

