import React from 'react'
import MessageBox from './views/message-box'
import MessageStore from '../stores/message-store'
import Marty from 'marty'
import ActionCreators from '../action-creators'

var MessageStateMixin = Marty.createStateMixin({
  listenTo: MessageStore,
  getState() {
    var id = 'bd94b175-3448-4de5-aa6f-6fde0ef60667'
    return {
      messageResults: MessageStore.getAll(id)
    }
  }
})

export default React.createClass({
  mixins: [MessageStateMixin],

  componentWillMount() {
    console.log('mounting')
    var id = 'bd94b175-3448-4de5-aa6f-6fde0ef60667'
    ActionCreators.getMessageStream(id)
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

