import React from 'react'
import Router, { Route, DefaultRoute, RouteHandler, NotFoundRoute } from 'react-router'
import MessageViewController from './components/message-view-controller'
import ActivityViewController from './components/activity-view-controller'
import LoginViewController from './components/login-view-controller'
import DashboardViewController from './components/dashboard-view-controller'
import TopNav from './components/views/top-nav'
import ActionCreators from './action-creators'

var App = React.createClass({
  componentWillMount() {
    ActionCreators.restoreSession()
  },

  render() {
    return (
      <div>
        <header className="top__header">
          <TopNav />
        </header>
        <main className="main__wrapper">
          <div className="main__application">
            <RouteHandler/>
          </div>
        </main>
        <footer className="bottom__footer">
          <div className="bottom__copy-container container">
            <p className="text-muted">&copy; 2014 Tommy Groshong</p>
          </div>
        </footer>
      </div>
    )
  }
})

var DefaultAct = React.createClass({
  render() {
    return (
      <h1>Choose an activity</h1>
    )
  }
})

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={LoginViewController}/>
    <Route name="signup" handler={LoginViewController}/>
    <Route name="team" handler={LoginViewController}/>
    <Route name="activity" path="/activity" handler={ActivityViewController}>
      <Route name="messages" path=":activityId/messages" handler={MessageViewController}/>
      <DefaultRoute handler={DefaultAct}/>
    </Route>
    <DefaultRoute handler={DashboardViewController}/>
  </Route>
)

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('application'))
})

