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

    var displayData = this.props.messages.length === 0
      ? <div className="messages-empty">Empty...</div>
      : <MessagesDisplay {...this.props} categories={categories} />

    return (
      <div className="MessagesWrapper">
        <div className="row">
          <h3 className="MessagesWrapper__Topic">{topic}</h3>
        </div>
        {displayData}
        <MessageInputArea ref='messageInputArea' {...this.props} categories={categories} onCreate={this.handleCreate} />
      </div>
    )
  }
})

