import React from 'react'
import { Input } from 'react-bootstrap'
import MessageBox from './message-box'
import MessageInputArea from './message-input-area'
import MessagesDisplay from './messages-display'

export default React.createClass({

  handleCreate(event) {
    this.props.onCreate(event)
  },

  getFormData() {
    return this.refs.messageInputArea.getFormData()
  },

  clearForm() {
    this.refs.messageInputArea.clearForm()
  },

  render() {
    var topic = this.props.activity.title
    var categories = this.props.activity.categories

    return (
      <div className="MessagesWrapper">
        <div className="row">
          <h3 className="MessagesWrapper__Topic">{topic}</h3>
        </div>
        <MessagesDisplay {...this.props} categories={categories} />
        <MessageInputArea ref='messageInputArea' {...this.props} categories={categories} onCreate={this.handleCreate} />
      </div>
    )
  }
})

