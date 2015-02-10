import React from 'react'
import {Button} from 'react-bootstrap'
import Router, {Navigation} from 'react-router'
import ActionCreators from '../action-creators'

export default React.createClass({
  mixins: [Navigation],

  buttonClick() {
    var username = this.refs.username.getDOMNode().value
    var password = this.refs.password.getDOMNode().value
    var promise = ActionCreators.login(username, password)

    promise.then(() => {
      this.transitionTo('activity')
    }).catch((err) => {
      // TODO validation error message
      console.log('Login Error', err)
    })
  },

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <label>
          Username:
          <input ref="username" name="username" type="text" />
        </label>
        <br />
        <label>
          Password:
          <input ref="password" name="password" type="password" />
        </label>
        <br />
        <button onClick={this.buttonClick} className="btn btn-primary">Login</button>
      </div>
    )
  }
})

