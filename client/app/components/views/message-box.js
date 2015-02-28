import React from 'react'

export default React.createClass({
  render() {
    var message = this.props.message
    var createDate = new Date(message.get('createDate'))
    return (
      <div className="message-container">
        <div className="message-box fade-in">
          {message.get('payload')}
          <br />
          <span className="message-date">{createDate.toDateString()}</span>
        </div>
      </div>
    )
  }
})
