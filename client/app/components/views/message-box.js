import React from 'react'

export default React.createClass({
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
