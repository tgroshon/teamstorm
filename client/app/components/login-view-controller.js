import React from 'react'

export default React.createClass({
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

