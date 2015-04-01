import React from 'react'

export let ErrorMessage = React.createClass({
  render() {
    return (
      <p className="Form__error_message text-danger">
        {this.props.msg}
      </p>     
    )
  }
})

export let Placeholder = React.createClass({
  render() {
    return (
      <div className="Form__error_message_spacer" />
    )
  }
})

