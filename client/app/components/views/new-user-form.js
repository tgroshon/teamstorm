import React from 'react'
import {Input} from 'react-bootstrap'
import { ErrorMessage, Placeholder } from './form-helpers'

function getBlankErrorState() {
  return {
    passwordError: null,
    firstNameError: null,
    lastNameError: null,
    emailError: null
  }
}

export default React.createClass({
  displayName: 'NewUserForm',

  getInitialState() {
    return getBlankErrorState()
  },

  formIsValid() {
    let validity = true
    let errorState = getBlankErrorState()
    if (this.refs.email.getValue().trim().length === 0) {
      errorState.emailError = 'Must enter an email address!'
      validity = false 
    }
    if (this.refs.firstName.getValue().trim().length === 0) {
      errorState.firstNameError = 'Must enter your first name!'
      validity = false 
    }
    if (this.refs.lastName.getValue().trim().length === 0) {
      errorState.lastNameError = 'Must enter your last name!'
      validity = false 
    }
    if (this.refs.password1.getValue().trim().length === 0) {
      errorState.passwordError = 'Must enter a password!'
      validity = false
    }
    if (this.refs.password1.getValue() !==
        this.refs.password2.getValue()) {
      errorState.passwordError = 'Passwords do not match'
      validity = false
    } 
    if (!validity) {
      this.setState(errorState)
    }
    return validity
  },

  handleCreate(event) {
    if (this.formIsValid()) {
      this.props.onCreate(event)
    }
  },

  handleCancel(event) {
    this.props.onCancel(event)
  },

  getFormData() {
    return {
      email: this.refs.email.getValue(),
      firstName: this.refs.firstName.getValue(),
      lastName: this.refs.lastName.getValue(),
      password: this.refs.password2.getValue()
    }
  },

  render() {
    var passwordErrorMessage = this.state.passwordError
      ? <ErrorMessage msg={this.state.passwordError} />
      : <Placeholder />

    var emailErrorMessage = this.state.emailError
      ? <ErrorMessage msg={this.state.emailError} />
      : <Placeholder />

    var firstNameErrorMessage = this.state.firstNameError
      ? <ErrorMessage msg={this.state.firstNameError} />
      : <Placeholder />

    var lastNameErrorMessage = this.state.lastNameError
      ? <ErrorMessage msg={this.state.lastNameError} />
      : <Placeholder />

    return (
      <div className="NewUserForm row">
        <div className="NewUserForm__inputs col-md-4">
          <div className="Form__input_group input-group">
            <Input type="email" ref="email" label="Email" />
            <Input type="text" ref="firstName" label="First Name" />
            <Input type="text" ref="lastName" label="Last Name" />
            <Input type="password" ref="password1" label="Password" />
            <Input type="password" ref="password2" label="Confirm Password" />
            <button className="btn btn-success action-btn" onClick={this.handleCreate}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
              Sign Up
            </button>
            <button className="btn btn-danger action-btn" onClick={this.handleCancel}>
              <span className="glyphicon glyphicon-minus" aria-hidden="true" />
              Cancel
            </button>
          </div>
        </div>
        <div className="NewUserForm__errors col-md-4">
          {emailErrorMessage}
          {firstNameErrorMessage}
          {lastNameErrorMessage}
          {passwordErrorMessage}
        </div>
      </div>
    )
  }
})
