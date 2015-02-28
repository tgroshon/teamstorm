import React from 'react'

export default React.createClass({
  render() {
    var message = this.props.message
    var createDate = new Date(message.get('createDate'))
    return (
      <div className="message-box-container">
        <div className="message-box fade-in">
          {message.get('payload')}
          <br />
          <span className="message-box-date">{createDate.toDateString()}</span>
        </div>
      </div>
    )
  }
})
