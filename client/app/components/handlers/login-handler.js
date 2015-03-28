import React from 'react'
import Router, {Navigation} from 'react-router'
import UserActions from '../../actions/users'
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
    UserActions.login(username, password)
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
        <hr />
        <a href="/login/facebook">
          <img src="/img/login-facebook.png" alt="Facebook Login Button" />
        </a>
        <a href="/login/google">
          <img style={{width: '245px'}} src="/img/login-google.png" alt="Google Login Button" />
        </a>
      </div>
    )
  }
})

