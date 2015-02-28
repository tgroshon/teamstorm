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
    console.log('Message listener fired')
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

  render() {
    if (this.state.pending) {
      return <div className="messages-loading">Loading...</div>
    } else if (this.state.messages.length == 0) {
        return <div className="messages-empty">Empty...</div>
    } else {
      var messageBoxes = this.state.messages.map((mess) => {
        return <MessageBox key={mess.get('id')} message={mess} />
      })

      return (
        <div className="row">
          {messageBoxes}
        </div>
      )
    }
  }
})

