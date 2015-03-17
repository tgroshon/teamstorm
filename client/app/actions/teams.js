import AppDispatcher from '../dispatcher'
import Constants from '../constants'
import HttpAPI from '../sources/http-api'
import LocalStorage from '../sources/local-storage'

export default {
  fetchTeams() {
    var token = LocalStorage.get('token')
    AppDispatcher.dispatch({
      type: Constants.Team.PENDING_TEAM_REQUEST,
    })
    if (token) {
      HttpAPI.fetchTeams(token, (err, res) => {
        if (err) {
          throw err
        }
        AppDispatcher.dispatch({
          type: Constants.Team.STORE_TEAMS,
          params: {
            teams: res.body.teams
          }
        })
      })
    }
  },

  createTeam(name, memberObjects) {
    var token = LocalStorage.get('token')
    if (token) {
      var members = memberObjects.map(member => { return member.id })
      var team = {name, members}
      HttpAPI.postTeam(token, team, (err, res) => {
        if (err) {
          return AppDispatcher.dispatch({
            type: Constants.Error.ERR_HTTP_POST_TEAM,
            params: {
              error: err,
              data: team
            }
          })
        }
        AppDispatcher.dispatch({
          type: Constants.Team.STORE_TEAMS,
          params: {
            teams: [res.body]
          }
        })
      })
    }
  }
}
