import React from 'react'

var _messages = []

var MessageBox = React.createClass({
  render() {
    var message = this.props.message
    var createDate = new Date(message.createDate)
    return (
      <div className="col-xs">
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
    this.evtSource.addEventListener("message", (event) => {
      _messages.push(JSON.parse(event.data))
      this.setState({ messages: _messages })
    })
  },

  componentWillUnmount() {
    _messages = []
    this.evtSource.close()
  },

  render() {
    var messageBoxes = this.state.messages.map((mess) => {
      return <MessageBox message={mess} />
    })
    return (
      <div className="row">
        {messageBoxes}
      </div>
    )
  }
})

export default SSE
