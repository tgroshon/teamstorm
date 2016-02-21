import React from 'react'
import UserActions from './actions/users'
import Router from 'react-router'
import MessageHandler from './components/messages/handlers/message-handler'
import ActivityHandler from './components/activities/handlers/activity-handler'
import ActivitiesHandler from './components/activities/handlers/activities-handler'
import NewActivityHandler from './components/activities/handlers/new-activity-handler'
import DashboardHandler from './components/common/handlers/dashboard-handler'
import TeamsHandler from './components/teams/handlers/teams-handler'
import TeamHandler from './components/teams/handlers/team-handler'
import NewTeamHandler from './components/teams/handlers/new-team-handler'
import EditTeamHandler from './components/teams/handlers/edit-team-handler'
import LoginHandler from './components/users/handlers/login-handler'
import OAuth2Handler from './components/users/handlers/oauth2-handler'
import AccountHandler from './components/users/handlers/account-handler'

var App = React.createClass({
  componentWillMount () {
    UserActions.restoreSession()
  },

  render () {
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
  render () {
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
  render () {
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
    <Route name="login" handler={LoginHandler}/>
    <Route name="account" handler={AccountHandler}/>
    <Route name="teams" path="/team" handler={TeamsHandler}>
      <Route name="new-team" path="new" handler={NewTeamHandler} />
      <Route name="edit-team" path=":teamId/edit" handler={EditTeamHandler} />
      <Route name="team" path=":teamId" handler={TeamHandler}/>
      <DefaultRoute handler={DefaultTeam}/>
    </Route>
    <Route name="activities" path="/activity" handler={ActivitiesHandler}>
      <Route name="new-activity" path="new" handler={NewActivityHandler} />
      <Route name="activity" path=":activityId" handler={ActivityHandler}/>
      <Route name="messages" path=":activityId/messages" handler={MessageHandler}/>
      <DefaultRoute handler={DefaultAct}/>
    </Route>
    <Route name="oauth2redirect" path="/oauth2redirect" handler={OAuth2Handler} />
    <DefaultRoute handler={DashboardHandler}/>
  </Route>
)

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('application'))
})

