import React from 'react'

var Login = React.createClass({
  render() {
    return (
      <form>
        <label>
          Username:
          <input name="username" type="text" />
        </label>
        <br />
        <label>
          Password:
          <input name="password" type="password" />
        </label>
      </form>
    )
  }
})

export default Login
