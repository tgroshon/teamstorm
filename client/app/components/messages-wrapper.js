import React from 'react'
import { Input } from 'react-bootstrap'
import MessageBox from './message-box'
import RadioGroup from './radio-group'

export default React.createClass({


  handleCreate(event) {
    this.props.onCreate(event)
  },

  getFormData() {
    return {
      text: this.refs.messageInputTextarea.getDOMNode().value,
      category: this.refs.messageInputCategory.getCheckedValue()
    }
  },

  clearForm() {
    this.refs.messageInputTextarea.getDOMNode().value = ''
  },

  render() {
    var displayData
    if (this.props.messages.length == 0) {
      displayData = <div className="messages-empty">Empty...</div>
    } else {
      var categorizedMessages = this.props.messages.reduce((result, mess) => {
        var key = mess.get('category') || 'is'
        var pointer = result[key]
        var list = Array.isArray(pointer) ? pointer : []
        result[key] = list.concat([<MessageBox key={mess.get('id')} message={mess} />])
        return result
      }, {})

      displayData = (
        <div className="row MessageList">
          <div className="MessageList__category">
            <h4 className="MessageList__category--header">Is</h4>
            {categorizedMessages.is}
          </div>
          <div className="MessageList__category">
            <h4 className="MessageList__category--header">Is Not</h4>
            {categorizedMessages.isnot}
          </div>
        </div>
      )
    }

    var topic = this.props.activity.title

    return (
      <div className="MessagesWrapper">
        <div className="row">
          <h3 className="MessagesWrapper__Topic">{topic}</h3>
        </div>
        {displayData}
        <div className="row MessageInputArea">
          <textarea
            className="form-control MessageInputArea__textarea"
            ref="messageInputTextarea"
            rows="3"
            maxLength="140"
            placeholder="Enter your message..."
           />
          <RadioGroup name="fruit" ref="messageInputCategory" value="is">
            <label className="MessageInputArea__category">
              <input type="radio" value="is" /> Is
            </label>
            <label className="MessageInputArea__category">
              <input type="radio" value="isnot"/> Is Not
            </label>
          </RadioGroup>
          <button ref="messageInputButton"
            onClick={this.handleCreate}
            className="btn btn-primary MessageInputArea__button"
          >
            Post
          </button>
        </div>
      </div>
    )

  }
})

