import React from 'react'
import UserStore from '../../stores/user-store'
import ErrorStore from '../../stores/error-store'
import Constants from '../../constants'
import ActionCreators from '../../action-creators'

export default React.createClass({
  displayName: 'AccountPage',

  getInitialState() {
    return {
      user: UserStore.getUser(),
      previousChanges: {},
      editing: false,
      httpError: null
    }
  },

  userStoreUpdate() {
    this.setState({
      user: UserStore.getUser()
    })
  },

  errorStoreUpdate() {
    this.setState({
      httpError: ErrorStore.get(Constants.Error.ERR_HTTP_USER_UPDATE)
    })
  },

  componentWillMount() {
    UserStore.on('login', this.userStoreUpdate)
    ErrorStore.on(Constants.Error.ERR_HTTP_USER_UPDATE, this.errorStoreUpdate)
  },

  componentWillUnmount() {
    UserStore.removeListener('login', this.userStoreUpdate)
    ErrorStore.removeListener(Constants.Error.ERR_HTTP_USER_UPDATE, this.errorStoreUpdate)
  },

  dataChanged(newData) {
    var sameData
    this.state.user.forEach((value, key) => {
      sameData = newData[key] === value
      return sameData
    })
    return !sameData
  },

  handleSave() {
    var updatedUser = {
      id: this.state.user.get('id'),
      email: this.refs.emailInput.getDOMNode().value,
      firstName: this.refs.firstNameInput.getDOMNode().value,
      lastName: this.refs.lastNameInput.getDOMNode().value
    }
    this.setState({
      editing: false,
      previousChanges: updatedUser
    })
    if (this.dataChanged(updatedUser)) {
      ActionCreators.updateUser(updatedUser)
    }
  },

  handleEdit() {
    this.setState({ editing: true })
  },

  handleCancel() {
    this.setState({ editing: false })
  },

  render() {
    if (!this.state.user) {
      return <div />
    }
    
    // TODO Better error handling UX
    if (this.state.httpError) {
      return <div>HTTP Error: {this.state.httpError.message}</div>
    }

    var user = this.state.user

    var mapFn
    var actionButtons
    if (this.state.editing) {
      mapFn = (attr) => {
        return <input type="text" ref={attr + 'Input'} className="form-control" defaultValue={user.get(attr)} />
      }
      actionButtons = [
        <button key="0" className="btn btn-primary action-btn" onClick={this.handleSave}>
          Save
        </button>,
        <button key="1" className="btn btn-danger action-btn" onClick={this.handleCancel}>
          Cancel
        </button>
      ]
    } else {
      mapFn = (attr) => {
        return <span>{user.get(attr)}</span>
      }
      actionButtons = (
        <button className="btn btn-primary action-btn" onClick={this.handleEdit}>
          Edit
        </button>
      )
    }

    var ATTRIBUTES = ['firstName', 'lastName', 'email']
    var dataCells = ATTRIBUTES.map(mapFn)

    return (
      <div className="container">
        <div className="row">
          <h2>Account</h2>
          <div className="col-md-6">
            <table className="table table-bordered">
              <tr>
                <td>First Name</td>
                <td>
                  {dataCells[0]}
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>
                  {dataCells[1]}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  {dataCells[2]}
                </td>
              </tr>
            </table>
            <div className="form-group">
              {actionButtons}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

