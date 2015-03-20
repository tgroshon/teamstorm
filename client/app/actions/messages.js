import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'
import HttpAPI from '../sources/http-api'
import LocalStorage from '../sources/local-storage'

function _streamListener(event) {
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
    console.log(exp)
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
              data: {payload, category}
            }
          })
        }
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
