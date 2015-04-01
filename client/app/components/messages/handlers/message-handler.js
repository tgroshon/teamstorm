import React from 'react'
import Router from 'react-router'
import MessageStore from '../../../stores/message-store'
import ActivityStore from '../../../stores/activity-store'
import MessageActions from '../../../actions/messages'
import MessagesWrapper from '../messages-wrapper'

export default React.createClass({
  mixins: [Router.State],

  getInitialState() {
    return {
      messages: MessageStore.getAll(this.getParams().activityId),
      activity: ActivityStore.get(this.getParams().activityId),
      pending: MessageStore.pendingRequest()
    }
  },

  storeUpdate() {
    this.setState({
      messages: MessageStore.getAll(this.getParams().activityId),
      activity: ActivityStore.get(this.getParams().activityId),
      pending: MessageStore.pendingRequest()
    })
  },

  componentWillMount() {
    MessageStore.on('change', this.storeUpdate)
    ActivityStore.on('activity', this.storeUpdate)
    MessageActions.fetchMessages(this.getParams().activityId)
    MessageActions.getMessageStream(this.getParams().activityId)
  },

  componentWillReceiveProps() {
    MessageActions.stopMessageStream()
    this.setState({
      messages: [],
      activity: ActivityStore.get(this.getParams().activityId),
      pending: true
    })
    MessageActions.killMessageCache(this.getParams().activityId)
    MessageActions.fetchMessages(this.getParams().activityId)
    MessageActions.getMessageStream(this.getParams().activityId)
  },

  componentWillUnmount() {
    MessageStore.removeListener('change', this.storeUpdate)
    ActivityStore.removeListener('activity', this.storeUpdate)
    MessageActions.stopMessageStream()
  },

  handleCreate(event) {
    var { text, category } = this.refs.messagesWrapper.getFormData()
    if (text.trim() !== '') {
      MessageActions.createMessage(this.getParams().activityId, text, category)
      this.refs.messagesWrapper.clearForm()
    }
  },

  render() {
    if (this.state.pending || !this.state.activity) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      )
    }

    return <MessagesWrapper
            ref='messagesWrapper'
            onCreate={this.handleCreate}
            messages={this.state.messages}
            activity={this.state.activity} />
  }
})

