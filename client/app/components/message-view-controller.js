import React from 'react'
import MessageBox from './views/message-box'
import MessageStore from '../stores/message-store'
import Marty from 'marty'
import ActionCreators from '../action-creators'

var activityId = '91cf93f7-d657-4c82-acd6-8cbaa03e4fa'
var MessageStateMixin = Marty.createStateMixin({
  listenTo: MessageStore,
  getState() {
    return {
      messageResults: MessageStore.getAll(activityId)
    }
  }
})

export default React.createClass({
  mixins: [MessageStateMixin],

  componentWillMount() {
    console.log('mounting')
    ActionCreators.getMessageStream(activityId)
  },

  componentWillUnmount() {
    console.log('Unmounting')
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
        }).toArray()

        return (
          <div className="row">
            {messageBoxes}
          </div>
        )
      }
    })
  }
})

