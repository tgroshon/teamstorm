import React from 'react'
import Router, { Link, Route, DefaultRoute, RouteHandler, NotFoundRoute } from 'react-router'
import MessageViewController from './components/handlers/message-handler'
import ActivityViewController from './components/handlers/activity-handler'
import ActivitiesViewController from './components/handlers/activities-handler'
import LoginViewController from './components/handlers/login-handler'
import NewUserViewController from './components/handlers/new-user-handler'
import DashboardViewController from './components/handlers/dashboard-handler'
import TeamsViewController from './components/handlers/teams-handler'
import TeamViewController from './components/handlers/team-handler'
import NewTeamHandler from './components/handlers/new-team-handler'
import NewActivityHandler from './components/handlers/new-activity-handler'
import OAuth2Handler from './components/handlers/oauth2-handler'
import AccountHandler from './components/handlers/account-handler'
import TopNav from './components/views/top-nav'
import UserActions from './actions/users'

var App = React.createClass({
  componentWillMount() {
    UserActions.restoreSession()
  },

  render() {
    return (
      <div>
        <header className="top__header">
          <TopNav />
        </header>
        <main className="Main__wrapper">
          <div className="Main__application">
            <RouteHandler/>
          </div>
        </main>
      </div>
    )
  }
})

var DefaultAct = React.createClass({
  render() {
    return (
      <div>
        <Link to="new-activity">
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          New Activity
        </Link>
        <h1>Choose an activity</h1>
      </div>
    )
  }
})

var DefaultTeam = React.createClass({
  render() {
    return (
      <div>
        <Link to="new-team">
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          New Team
        </Link>
        <h1>Choose a Team</h1>
      </div>
    )
  }
})

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={LoginViewController}/>
    <Route name="signup" handler={NewUserViewController}/>
    <Route name="account" handler={AccountHandler}/>
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
    <Route name="oauth2redirect" path="/oauth2redirect" handler={OAuth2Handler} />
    <DefaultRoute handler={DashboardViewController}/>
  </Route>
)

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('application'))
})

