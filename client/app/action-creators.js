import pathToUrl from 'path-to-url'
import request from 'superagent'
import AppDispatcher from './dispatcher'
import Constants from './constants'
import HttpAPI from './sources/http-api'
import LocalStorage from './sources/local-storage'

/*
 * Private Helper Functions
 */
function persistToken(token) {
  return LocalStorage.set('token', token)
}

function destroyToken() {
  return LocalStorage.remove('token')
}

function lookupToken() {
  return LocalStorage.get('token')
}

function decodeUserFromToken(token) {
  return JSON.parse(window.atob(token.split('.')[1]))
}

function streamListener(event) {
  try {
    var message = JSON.parse(event.data)
    AppDispatcher.dispatch({
      type: Constants.Message.STORE_MESSAGES,
      params: {
        activityId: message.activityId,
        messages: [message]
      }
    })
  } catch (exp) {
    console.log(exp)
    throw exp
  }
}

/*
 * Public Interface of Action Creators
 */
export default {
  
  login(email, password) {
    HttpAPI.login(email, password, (err, res) => {
      if (err) {
        return AppDispatcher.dispatch({
          type: Constants.User.FAILED_AUTH,
          params: err
        })
      }
      persistToken(res.body.token)
      AppDispatcher.dispatch({
        type: Constants.User.STORE_USER,
        params: {
          user: decodeUserFromToken(res.body.token)
        }
      })
    })
  },

  logout() {
    destroyToken()
    AppDispatcher.dispatch({
      type: Constants.User.LOGOUT
    })
  },

  restoreSession() {
    var token = lookupToken()
    if (token) {
      AppDispatcher.dispatch({
        type: Constants.User.STORE_USER,
        params: {
          user: decodeUserFromToken(token)
        }
      })
    }
  },

  clearError(name) {
    AppDispatcher.dispatch({
      type: Constants.Error.CLEAR_ERR,
      params: { name }
    })
  },

  updateUser(newData) {
    var token = lookupToken()
    if (token) {
      HttpAPI.putUser(token, newData, (err, res) => {
        if (err) {
          return AppDispatcher.dispatch({
            type: Constants.Error.ERR_HTTP_USER_UPDATE,
            params: {
              error: err
            }
          })
        }
        persistToken(res.body.token)
        AppDispatcher.dispatch({
          type: Constants.User.STORE_USER,
          params: {
            user: decodeUserFromToken(res.body.token)
          }
        })
      })
    }
  },

  searchUsers(query) {
    var token = lookupToken()
    if (token) {
      HttpAPI.searchUsers(token, query, (err, res) => {
        AppDispatcher.dispatch({
          type: Constants.User.STORE_SEARCH_RESULTS,
          params: {
            users: res.body.users
          }
        })
      })
    }
  },

  fetchTeams() {
    var token = lookupToken()
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
  },

  fetchMessages(activityId) {
    var token = lookupToken()
    AppDispatcher.dispatch({
      type: Constants.Message.PENDING_MESSAGE_REQUEST,
    })
    if (token) {
      HttpAPI.fetchMessages(token, activityId, (err, res) => {
        if (err) {
          //TODO logging
          return
        }
        AppDispatcher.dispatch({
          type: Constants.Message.STORE_MESSAGES,
          params: {
            activityId,
            messages: res.body.messages
          }
        })
      })
    }
  },

  fetchActivities() {
    var token = lookupToken()
    if (token) {
      HttpAPI.fetchActivities(token, (err, res) => {
        if (err) {
          //TODO logging
          return
        }
        AppDispatcher.dispatch({
          type: Constants.Activity.STORE_ACTIVITIES,
          params: {
            activities: res.body.activities
          }
        })
      })
    }
  },

  postMessage(activityId, message) {
    var token = lookupToken()
    if (token) {
      HttpAPI.postMessage(token, activityId, message, (err, res) => {
        
      })
    }
  },

  getMessageStream(activityId) {
    var token = lookupToken()
    if (token) {
      HttpAPI.getMessageStream(token, activityId, streamListener)
    }
  },

  stopMessageStream() {
    HttpAPI.stopMessageStream(streamListener)
  },

  killMessageCache(activityId) {
    AppDispatcher.dispatch({
      type: Constants.Message.KILL_MESSAGE_CACHE,
      params: {activityId}
    })
  },
}
