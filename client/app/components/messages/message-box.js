import React from 'react'

export default React.createClass({
  render() {
    var message = this.props.message
    var createDate = new Date(message.get('createDate'))
    return (
      <div className="MessageBox">
        <div className="MessageBox__container fade-in">
          {message.get('payload')}
          <br />
          <span className="MessageBox__date">{createDate.toDateString()}</span>
        </div>
      </div>
    )
  }
})
