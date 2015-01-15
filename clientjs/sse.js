import React from 'react'

var _messages = []

var SSE = React.createClass({

  getInitialState() {
    return {
      messages: _messages
    }
  },

  componentWillMount() {
    this.evtSource = new EventSource("/users/stream")
    this.evtSource.addEventListener("user", (event) => {
      _messages.push(event.data)
      this.setState({ messages: _messages })
    })
  },

  componentWillUnmount() {
    _messages = []
    this.evtSource.close()
  },

  render() {
    console.log('triggered re-render')
    var li = this.state.messages.map((mess) => {
      return <li>{mess}</li>
    })
    return (
      <ul>
        {li}
      </ul>
    )
  }
})

export default SSE
