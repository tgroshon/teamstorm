import React from 'react'
import Router from 'react-router'
import MessageBox from '../views/message-box'
import MessageStore from '../../stores/message-store'
import MessageActions from '../../actions/messages'
import { Input } from 'react-bootstrap'
import RadioGroup from '../views/radio-group'


export default React.createClass({
  mixins: [Router.State],

  getInitialState() {
    return {
      messages: MessageStore.getAll(),
      pending: MessageStore.pendingRequest()
    }
  },

  storeUpdate() {
    this.setState({
      messages: MessageStore.getAll(this.getParams().activityId),
      pending: MessageStore.pendingRequest()
    })
  },

  componentWillMount() {
    MessageStore.on('change', this.storeUpdate)
    MessageActions.fetchMessages(this.getParams().activityId)
    MessageActions.getMessageStream(this.getParams().activityId)
  },

  componentWillReceiveProps() {
    MessageActions.stopMessageStream()
    this.setState({ messages: [] })
    MessageActions.killMessageCache(this.getParams().activityId)
    MessageActions.fetchMessages(this.getParams().activityId)
    MessageActions.getMessageStream(this.getParams().activityId)
  },

  componentWillUnmount() {
    MessageStore.removeListener('change', this.storeUpdate)
    MessageActions.stopMessageStream()
  },

  handleCreate() {
    var text = this.refs.messageInputTextarea.getDOMNode().value
    var category = this.refs.messageInputCategory.getCheckedValue()
    if (text.trim() !== '') {
      MessageActions.createMessage(this.getParams().activityId, text, category)
      this.refs.messageInputTextarea.getDOMNode().value = ''
    }
  },

  render() {
    var displayData
    if (this.state.pending) {
      displayData = <div className="messages-loading">Loading...</div>
    } else if (this.state.messages.length == 0) {
      displayData = <div className="messages-empty">Empty...</div>
    } else {
      var categorizedMessages = this.state.messages.reduce((result, mess) => {
        var pointer = result[mess.get('category')]
        var list = Array.isArray(pointer) ? pointer : []
        result[mess.get('category')] = list.concat([<MessageBox key={mess.get('id')} message={mess} />])
        return result
      }, {})

      displayData = (
        <div className="row MessageList">
          <div className="MessageList__category">
            <h4 className="MessageList__category--header">Is</h4>
            {categorizedMessages.is || categorizedMessages[undefined]}
          </div>
          <div className="MessageList__category">
            <h4 className="MessageList__category--header">Is Not</h4>
            {categorizedMessages.isnot}
          </div>
        </div>
      )
    }

    return (
      <div className="MessagesWrapper">
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

