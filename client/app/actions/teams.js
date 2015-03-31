import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'
import HttpAPI from '../sources/http-api'
import LocalStorage from '../sources/local-storage'

export default {
  fetchTeams() {
    var token = LocalStorage.get('token')
    AppDispatcher.dispatch({
      type: ActionTypes.PENDING_TEAM_REQUEST,
    })
    if (token) {
      HttpAPI.fetchTeams(token, (err, res) => {
        if (err) {
          throw err
        }
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_TEAMS,
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
            type: ActionTypes.ERR_HTTP_POST_TEAM,
            params: {
              error: err,
              data: team
            }
          })
        }
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_TEAMS,
          params: {
            teams: [res.body]
          }
        })
      })
    }
  },

  getMembers(teamId, memberIds) {
    var token = LocalStorage.get('token')
    if (token) {
      HttpAPI.fetchUsers(token, userIds, (err, res) => {
        if (err) {
          return AppDispatcher.dispatch({
            type: ActionTypes.ERR_HTTP_GET_USERS,
            params: {
              error: err
            }
          })
        }
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_TEAM_MEMBERS,
          params: {
            members: res.body.users,
            teamId: teamId
          }
        })
      })
    }
  },

  editTeam(id, name, memberObjects) {
    var token = LocalStorage.get('token')
    if (token) {
      var members = memberObjects.map(member => { return member.id })
      var team = {id, name, members}
      HttpAPI.putTeam(token, team, (err, res) => {
        if (err) {
          return AppDispatcher.dispatch({
            type: ActionTypes.ERR_HTTP_PUT_TEAM,
            params: {
              error: err,
              data: team
            }
          })
        }
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_TEAMS,
          params: {
            teams: [res.body]
          }
        })
      })
    }

  }
}
