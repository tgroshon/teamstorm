import React from 'react'
import Marty from 'marty'
import Router, { Link, Navigation } from 'react-router'
import { Nav, Navbar, NavItem, DropdownButton, MenuItem } from 'react-bootstrap'
import UserStore from '../../stores/user-store'
import ActionCreators from '../../action-creators'

var UserStateMixin = Marty.createStateMixin({
  listenTo: UserStore,
  getState() {
    return {
      user: UserStore.getUser()
    }
  }
})

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
  mixins: [UserStateMixin, Navigation],

  handleLogout(evt) {
    evt.preventDefault()
    ActionCreators.logout()
    this.setState({user: null})
    this.transitionTo('login')
  },

  handleLogin(evt) {
    evt.preventDefault()
    this.transitionTo('login')
  },

  getUserAuthLink() {
    if (this.state.user) {
      return (
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      )
    } else {
      return (
        <MenuItem onClick={this.handleLogin}>Login</MenuItem>
      )
    }
  },

  getDropdown() {
    return (
      <DropdownButton key={5} title="Dropdown">
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3">Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
      </DropdownButton>
    )
  },

  render() {
    return (
      <Navbar className="navbar-fixed-top">
        <Nav>
          <div key={1} className="navbar-brand">TeamStorm</div>
          <CustomItem key={2} to="team">Teams</CustomItem>
          <CustomItem key={3} to="activity">Activities</CustomItem>
          {this.getUserAuthLink()}
          {this.getDropdown()}
        </Nav>
      </Navbar>
    )
  }
})

