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
          return
        }
        AppDispatcher.dispatch({
          type: Constants.Team.STORE_TEAMS,
          params: {
            teams: res.body.teams
          }
        })
      })
    }
  }
}
