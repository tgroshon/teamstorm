import React from 'react'
import Router, { Link } from 'react-router'
import { Nav, Navbar, NavItem, DropdownButton, MenuItem } from 'react-bootstrap'

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
  render() {
    return (
      <Navbar className="navbar-fixed-top">
        <Nav>
          <div className="navbar-brand">TeamStorm</div>
          <NavItem eventKey={1} href="#/">Teams</NavItem>
          <CustomItem to="activity">Activities</CustomItem>
          <DropdownButton eventKey={3} title="Dropdown">
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </DropdownButton>
        </Nav>
      </Navbar>
    )
  }
})

