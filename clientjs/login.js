import React from 'react'

var Login = React.createClass({
  render() {
    return (
      <form>
        <input name="username" type="text" />
        <input name="password" type="password" />
      </form>
    )
  }
})

export default Login
