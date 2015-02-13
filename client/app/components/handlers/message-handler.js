import React from 'react'
import Marty from 'marty'
import Router from 'react-router'
import MessageBox from '../views/message-box'
import MessageStore from '../../stores/message-store'
import ActionCreators from '../../action-creators'

var MessageStateMixin = Marty.createStateMixin({
  listenTo: MessageStore,
  getState() {
    var activityId = this.getParams().activityId
    return {
      messageResults: MessageStore.getAll(activityId)
    }
  }
})

export default React.createClass({
  mixins: [Router.State, MessageStateMixin],

  componentWillMount() {
    ActionCreators.getMessageStream(this.getParams().activityId)
  },

  componentWillReceiveProps() {
    ActionCreators.stopMessageStream()
    ActionCreators.killMessageCache(this.getParams().activityId)
    ActionCreators.getMessageStream(this.getParams().activityId)
  },

  componentWillUnmount() {
    ActionCreators.stopMessageStream()
  },

  render() {
    return this.state.messageResults.when({
      pending() {
        return <div className="messages-loading">Loading...</div>
      },
      failed(error) {
        return <div className="messages-error">{error.message}</div>
      },
      done(messages) {
        var messageBoxes = messages.map((mess) => {
          return <MessageBox key={mess.id} message={mess} />
        })

        return (
          <div className="row">
            {messageBoxes}
          </div>
        )
      }
    })
  }
})

