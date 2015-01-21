import React from 'react'
import request from 'superagent'
import MessageBox from './views/message-box'

var _messages = []

export default React.createClass({

  getInitialState() {
    return {
      messages: _messages
    }
  },

  componentWillMount() {
    request.get('/messages').end((err, res) => {
      this.setState({ messages: res.body.messages })
    })
    // this.evtSource = new EventSource("/messages/stream")
    // this.evtSource.addEventListener("message", (event) => {
    //   _messages.push(JSON.parse(event.data))
    //   this.setState({ messages: _messages })
    // })
  },

  componentWillUnmount() {
    _messages = []
    // this.evtSource.close()
  },

  render() {
    var messageBoxes = this.state.messages.map((mess) => {
      return <MessageBox key={mess.id} message={mess} />
    })
    return (
      <div className="row">
        {messageBoxes}
      </div>
    )
  }
})

