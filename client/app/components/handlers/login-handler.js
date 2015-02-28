import React from 'react'
import Router, {Navigation} from 'react-router'
import ActionCreators from '../../action-creators'
import UserStore from '../../stores/user-store'

export default React.createClass({
  mixins: [Navigation],

  userLoginEvent(evt) {
    this.transitionTo('activities')
  },

  userAuthFailEvent(evt) {
    // TODO Render the failures
    var errors = UserStore.getValidationErrors()
    console.log('Validation Errors', errors)
  },

  buttonClick() {
    var username = this.refs.username.getDOMNode().value
    var password = this.refs.password.getDOMNode().value
    ActionCreators.login(username, password)
  },

  componentWillMount() {
    UserStore.on('login', this.userLoginEvent)
    UserStore.on('authfail', this.userAuthFailEvent)
  },

  componentWillUnmount() {
    UserStore.removeListener('login', this.userLoginEvent)
    UserStore.removeListener('authfail', this.userAuthFailEvent)
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

