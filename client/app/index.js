import React from 'react'
import jQuery from 'jquery'
window.jQuery = jQuery
window.$ = jQuery
import Router, { Route, DefaultRoute, RouteHandler, NotFoundRoute } from 'react-router'
import MessageViewController from './components/handlers/message-handler'
import ActivityViewController from './components/handlers/activity-handler'
import ActivitiesViewController from './components/handlers/activities-handler'
import LoginViewController from './components/handlers/login-handler'
import DashboardViewController from './components/handlers/dashboard-handler'
import TeamsViewController from './components/handlers/teams-handler'
import TeamViewController from './components/handlers/team-handler'
import NewTeamHandler from './components/handlers/new-team-handler'
import NewActivityHandler from './components/handlers/new-activity-handler'
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

var DefaultTeam = React.createClass({
  render() {
    return (
      <h1>Choose a Team</h1>
    )
  }
})

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={LoginViewController}/>
    <Route name="signup" handler={LoginViewController}/>
    <Route name="teams" path="/team" handler={TeamsViewController}>
      <Route name="new-team" path="new" handler={NewTeamHandler} />
      <Route name="team" path=":teamId" handler={TeamViewController}/>
      <DefaultRoute handler={DefaultTeam}/>
    </Route>
    <Route name="activities" path="/activity" handler={ActivitiesViewController}>
      <Route name="new-activity" path="new" handler={NewActivityHandler} />
      <Route name="activity" path=":activityId" handler={ActivityViewController}/>
      <Route name="messages" path=":activityId/messages" handler={MessageViewController}/>
      <DefaultRoute handler={DefaultAct}/>
    </Route>
    <DefaultRoute handler={DashboardViewController}/>
  </Route>
)

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('application'))
})

