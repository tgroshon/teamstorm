import React from 'react'
import Router, { Route, DefaultRoute, RouteHandler, Link, NotFoundRoute } from 'react-router'
import Login from './login'
import SSE from './sse'

var TopNav = React.createClass({
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
            <Link className="top__navigation_link" to="sse">Events</Link>
          </li>
        </ul>
      </nav>
    )
  }
})

var App = React.createClass({
  render() {
    return (
      <div>
        <header className="top__header">
          <TopNav />
        </header>
        <RouteHandler/>
      </div>
    )
  }
})

var Dashboard = React.createClass({
  render() {
    return (
      <h2>I am the Dashboard</h2>
    )
  }
})

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="sse" handler={SSE}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('application'))
})

