import React from 'react'
import Router, { Link, Navigation } from 'react-router'
import { Nav, Navbar, NavItem, DropdownButton, MenuItem } from 'react-bootstrap'
import UserStore from '../../stores/user-store'
import UserActions from '../../actions/users'

var CustomItem = React.createClass({
  render() {
    return (
      <li>
        <Link className={this.props.className} to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    )
  }
})

export default React.createClass({
  displayName: 'TopNavigation',
  mixins: [Navigation],

  getInitialState() {
    return {
      authenticated: UserStore.authenticated()
    }
  },

  storeUpdate() {
    this.setState({ authenticated: UserStore.authenticated() })
  },

  componentWillMount() {
    UserStore.on('change', this.storeUpdate)
  },

  componentWillUnmount() {
    UserStore.removeListener('change', this.storeUpdate)
  },

  handleLogout(evt) {
    evt.preventDefault()
    UserActions.logout()
    this.transitionTo('login')
  },

  getUserAuthLink() {
    if (this.state.user) {
    } else {
      return (
        <MenuItem onClick={this.handleLogin}>Login</MenuItem>
      )
    }
  },

  getNavItems() {
    if (this.state.authenticated) {
      return [
        <CustomItem key={2} to="teams">Teams</CustomItem>,
        <CustomItem key={3} to="activities">Activities</CustomItem>,
        <CustomItem key={4} to="account">Account</CustomItem>,
        <MenuItem key={5} onClick={this.handleLogout}>Logout</MenuItem>
      ]
    } else {
      return (
        <CustomItem key={2} to="login">Login</CustomItem>
      )
    }
  },

  render() {
    return (
      <Navbar className="navbar-fixed-top">
        <Nav>
          <div key={1} className="navbar-brand">TeamStorm</div>
          {this.getNavItems()}
        </Nav>
      </Navbar>
    )
  }
})

