import React from 'react'
import UserStore from '../../stores/user-store'

export default React.createClass({
  displayName: 'AccountPage',

  getInitialState() {
    return {
      user: UserStore.getUser(),
      editing: false
    }
  },

  storeUpdate() {
    this.setState({
      user: UserStore.getUser()
    })
  },

  componentWillMount() {
    UserStore.on('login', this.storeUpdate)
  },

  componentWillUnmount() {
    UserStore.removeListener('login', this.storeUpdate)
  },

  handleClick() {
    if (this.state.editing) {
      this.setState({ editing: false })
    } else {
      this.setState({ editing: true })
    }
  },

  render() {
    if (!this.state.user) {
      return false
    }
    
    var user = this.state.user
    var DisplayData = this.state.editing ? InputTable : AccountTable
    var buttonText = this.state.editing ? 'Save' : 'Edit'

    return (
      <div className="container">
        <div className="row">
          <h2>Account</h2>
          <div className="col-md-6">
            <DisplayData user={user} />
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var InputTable = React.createClass({
  render() {
    var user = this.props.user
    return (
      <table className="table table-bordered">
        <tr>
          <td>First Name</td>
          <td>
            <input type="text" className="form-control" defaultValue={user.get('firstName')} />
          </td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>
            <input type="text" className="form-control" defaultValue={user.get('lastName')} />
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            <input type="text" className="form-control" defaultValue={user.get('email')} />
          </td>
        </tr>
      </table>
    )
  }
})

var AccountTable = React.createClass({
  render() {
    var user = this.props.user
    return (
      <table className="table table-bordered">
        <tr>
          <td>First Name</td>
          <td>{user.get('firstName')}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>{user.get('lastName')}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{user.get('email')}</td>
        </tr>
      </table>
    )
  }
})
