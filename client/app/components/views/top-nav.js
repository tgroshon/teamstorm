import React from 'react'
import Router, { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <nav className="col-xs top__navigation">
        <ul className="top__navigation_list">
          <li className="top__navigation_list_item">
            <Link className="top__navigation_link" to="app">Home</Link>
          </li>
          <li className="top__navigation_list_item">
            <Link className="top__navigation_link" to="login">Login</Link>
          </li>
          <li className="top__navigation_list_item">
            <Link className="top__navigation_link" to="messages">Philosophy</Link>
          </li>
          <li className="top__navigation_list_item">
            <Link className="top__navigation_link" to="messages">Messages</Link>
          </li>
        </ul>
      </nav>
    )
  }
})
