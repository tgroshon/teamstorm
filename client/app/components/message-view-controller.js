import React from 'react'
import MessageBox from './views/message-box'
import MessageStore from '../stores/message-store'
import Marty from 'marty'

var MessageStateMixin = Marty.createStateMixin({
  listenTo: MessageStore,
  getState() {
    return {
      messageResults: MessageStore.getAll(1)
    }
  }
})

export default React.createClass({
  mixins: [MessageStateMixin],
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

