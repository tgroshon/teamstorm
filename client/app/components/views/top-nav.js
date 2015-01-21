import React from 'react'
import Router, { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <nav className="top__navigation">
        <ul className="top__navigation_list">
          <li className="top__navigation_list_item">
            <Link className="top__navigation_link" to="app">Dashboard</Link>
          </li>
          <li className="top__navigation_list_item">
            <Link className="top__navigation_link" to="login">Login</Link>
          </li>
          <li className="top__navigation_list_item">
            <Link className="top__navigation_link" to="messages">Messages</Link>
          </li>
        </ul>
      </nav>
    )
  }
})
