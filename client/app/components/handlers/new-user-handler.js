import React from 'react'
import Router, { Navigation } from 'react-router'
import NewUserForm from '../views/new-user-form'
import UserActions from '../../actions/users'
import UserStore from '../../stores/user-store'
import ErrorStore from '../../stores/error-store'

export default React.createClass({

  displayName: 'NewUserHandler',

  mixins: [ Navigation ],

  userStoreUpdate() {
    if (UserStore.authenticated()) {
      this.transitionTo('/')
    }
  },

  errorStoreUpdate() {

  },

  componentWillMount() {
    UserStore.on('login', this.userStoreUpdate)
  },

  componentWillUnmount() {
    UserStore.removeListener('login', this.userStoreUpdate)
  },

  handleCreate() {
    var {email, firstName, lastName, password} = this.refs.userForm.getFormData()
    UserActions.signup(email, firstName, lastName, password)
  },

  handleCancel() {
    
  },

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <NewUserForm
          ref="userForm"
          onCreate={this.handleCreate}
          onCancel={this.handleCancel} />
      </div>
    )
  }
})
