import React from 'react'
import Router, { Route, DefaultRoute, RouteHandler, Link, NotFoundRoute } from 'react-router'
import Login from './login'
import SSE from './sse'

var App = React.createClass({
  render() {
    return (
      <div>
        <header>
          <h1>Welcome</h1>
          <p>Page generated with React</p>
          <ul>
            <li><Link to="app">Dashboard</Link></li>
            <li><Link to="login">Login</Link></li>
            <li><Link to="sse">Events</Link></li>
          </ul>
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
  React.render(<Handler/>, document.body)
})

