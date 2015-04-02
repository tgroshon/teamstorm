import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'
import HttpAPI from '../sources/http-api'
import LocalStorage from '../sources/local-storage'

function _streamListener(event) {
  if (event.origin != 'https://teamstorm.herokuapp.com' && 
      event.origin != 'http://teamstorm.docker') {
    throw new Error('Bad origin on message: ' + event.origin)
  }
  try {
    var message = JSON.parse(event.data)
    AppDispatcher.dispatch({
      type: ActionTypes.STORE_MESSAGES,
      params: {
        activityId: message.activityId,
        messages: [message]
      }
    })
  } catch (exp) {
    throw exp
  }
}

export default {

  fetchMessages(activityId) {
    var token = LocalStorage.get('token')
    AppDispatcher.dispatch({
      type: ActionTypes.PENDING_MESSAGE_REQUEST,
    })
    if (token) {
      HttpAPI.fetchMessages(token, activityId, (err, res) => {
        if (err) {
          //TODO logging
          return
        }
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_MESSAGES,
          params: {
            activityId,
            messages: res.body.messages
          }
        })
      })
    }
  },

  createMessage(activityId, payload, category) {
    var token = LocalStorage.get('token')
    if (token) {
      var message = {payload, category}
      HttpAPI.postMessage(token, activityId, message, (err, res) => {
        if (err) {
          return AppDispatcher.dispatch({
            type: ActionTypes.ERR_HTTP_POST_MESSAGE,
            params: {
              error: err,
              data: message
            }
          })
        }
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_MESSAGES,
          params: {
            activityId: activityId,
            messages: [res.body]
          }
        })
      })
    }
  },

  getMessageStream(activityId) {
    var token = LocalStorage.get('token')
    if (token) {
      HttpAPI.getMessageStream(token, activityId, _streamListener)
    }
  },

  stopMessageStream() {
    HttpAPI.stopMessageStream(_streamListener)
  },

  killMessageCache(activityId) {
    AppDispatcher.dispatch({
      type: ActionTypes.KILL_MESSAGE_CACHE,
      params: {activityId}
    })
  }
}
