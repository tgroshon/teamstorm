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
  console.log('Saving token')
  return LocalStorage.set('token', token)
}

function destroyToken() {
  console.log('Destroying Token')
  return LocalStorage.remove('token')
}

function lookupToken() {
  var token = LocalStorage.get('token')
  console.log('Looking up Token', !!token)
  return token
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

function decodeUserFromToken(token) {
  var decodedPieces = token.split('.').map((segment) => {
    return window.atob(segment)
  })
  return decodedPieces[1]
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
        params: decodeUserFromToken(res.body.token)
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
        params: decodeUserFromToken(token)
      })
    }
  },

  searchUsers(query) {
    var token = lookupToken()
    if (token) {
      HttpAPI.searchUsers(token, query, (err, res) => {

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
