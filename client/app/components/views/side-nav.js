import React from 'react'
import Router, { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <nav className="side__navigation">
        <ul className="side__navigation_list">
          <li className="side__navigation_list_item">
            <Link className="side__navigation_link" to="messages">Dashboard</Link>
          </li>
          <li className="side__navigation_list_item">
            <Link className="side__navigation_link" to="messages">Activities</Link>
          </li>
          <li className="side__navigation_list_item">
            <Link className="side__navigation_link" to="messages">Teams</Link>
          </li>
        </ul>
      </nav>
    )
  }
})
