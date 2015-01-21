import React from 'react'
import request from 'superagent'

var _messages = []

var MessageBox = React.createClass({
  render() {
    var message = this.props.message
    var createDate = new Date(message.createDate)
    return (
      <div>
        <div className="message-box">
          {message.payload}
          <br />
          <span className="message-date">{createDate.toDateString()}</span>
        </div>
      </div>
    )
  }
})

var SSE = React.createClass({

  getInitialState() {
    return {
      messages: _messages
    }
  },

  componentWillMount() {
    this.evtSource = new EventSource("/messages/stream")
    request.get('/messages').end((err, res) => {
      this.setState({ messages: res.body.messages })
    })
    // this.evtSource.addEventListener("message", (event) => {
    //   _messages.push(JSON.parse(event.data))
    //   this.setState({ messages: _messages })
    // })
  },

  componentWillUnmount() {
    _messages = []
    this.evtSource.close()
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

export default SSE
