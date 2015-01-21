import React from 'react'
import Router, { Route, DefaultRoute, RouteHandler, Link, NotFoundRoute } from 'react-router'
import MessageViewController from './components/message-view-controller'
import LoginViewController from './components/login-view-controller'
import DashboardViewController from './components/dashboard-view-controller'
import TopNav from './components/views/top-nav'

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

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={LoginViewController}/>
    <Route name="messages" handler={MessageViewController}/>
    <DefaultRoute handler={DashboardViewController}/>
  </Route>
)

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('application'))
})

