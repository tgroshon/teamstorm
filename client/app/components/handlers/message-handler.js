import React from 'react'
import Router from 'react-router'
import MessageBox from '../views/message-box'
import MessageStore from '../../stores/message-store'
import ActionCreators from '../../action-creators'


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
    ActionCreators.fetchMessages(this.getParams().activityId)
    ActionCreators.getMessageStream(this.getParams().activityId)
  },

  componentWillReceiveProps() {
    ActionCreators.stopMessageStream()
    this.setState({ messages: [] })
    ActionCreators.killMessageCache(this.getParams().activityId)
    ActionCreators.fetchMessages(this.getParams().activityId)
    ActionCreators.getMessageStream(this.getParams().activityId)
  },

  componentWillUnmount() {
    MessageStore.removeListener('change', this.storeUpdate)
    ActionCreators.stopMessageStream()
  },

  handleCreate() {
    var messageText = this.refs.messageInputTextarea.getDOMNode().value
    ActionCreators.postMessage(this.getParams().activityId, messageText)
    this.refs.messageInputTextarea.getDOMNode().value = ''
  },

  render() {
    var displayData
    if (this.state.pending) {
      displayData = <div className="messages-loading">Loading...</div>
    } else if (this.state.messages.length == 0) {
      displayData = <div className="messages-empty">Empty...</div>
    } else {
      displayData = this.state.messages.map((mess) => {
        return <MessageBox key={mess.get('id')} message={mess} />
      })
    }

    return (
      <div className="messages-wrapper">
        <div className="row message-box-list">
          {displayData}
        </div>
        <div className="row message-box-input-area">
          <textarea
            className="form-control message-box-input-textarea"
            ref="messageInputTextarea"
            rows="3"
            maxLength="140"
            placeholder="Enter your message..."
           />
          <button onClick={this.handleCreate} className="btn btn-primary message-box-input-button">
            Post
          </button>
        </div>
      </div>
    )
  }
})

