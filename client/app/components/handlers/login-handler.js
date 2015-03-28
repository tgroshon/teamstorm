import React from 'react'
import Router, {Navigation} from 'react-router'
import UserActions from '../../actions/users'
import UserStore from '../../stores/user-store'

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      openForm: false
    }
  },

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

  toggleForm(event) {
    event.preventDefault()
    this.setState({openForm: !this.state.openForm})
  },

  render() {
    var loginForm = null
    if (this.state.openForm) {
      loginForm = (
        <div className="col-lg-4 form-group">
          <label>
            Email:
            <input ref="username" className="form-control" name="username" type="text" />
          </label>
          <label>
            Password:
            <input ref="password" className="form-control" name="password" type="password" />
          </label>
          <br />
          <button onClick={this.buttonClick} className="btn btn-primary">Login</button>
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col-lg-4">
            <h1>Authenticate</h1>
            <a href="/login/facebook" className="btn btn-block btn-social btn-lg btn-facebook">
              <i className="fa fa-facebook"></i> Sign in with Facebook
            </a>
            <a href="/login/google" className="btn btn-block btn-social btn-lg btn-google-plus">
              <i className="fa fa-google-plus"></i> Sign in with Google
            </a>
            <hr />
            <a href="#" onClick={this.toggleForm}>
              <small>Password Login</small>
            </a>
          </div>
        </div>
        <div className="row">
          {loginForm}
        </div>
      </div>
    )
  }
})

