import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'
import HttpAPI from '../sources/http-api'
import LocalStorage from '../sources/local-storage'

function _decodeUserFromToken(token) {
  try {
    return JSON.parse(window.atob(token.split('.')[1]))
  } catch (e) {
    AppDispatcher.dispatch({
      type: ActionTypes.ERR_DECODE_TOKEN,
      params: {
        error: e
      }
    })
  }
}

export default {
  signup(email, firstName, lastName, password) {
    if (!LocalStorage.get('token')) {
      let user = {email, password, firstName, lastName}
      HttpAPI.postUser(user, (err, res) => {
        if (err) {
          return AppDispatcher.dispatch({
            type: ActionTypes.ERR_HTTP_POST_USER,
            params: {
              error: err,
              data: user
            }
          })
        }
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_USER,
          params: {
            user: _decodeUserFromToken(res.body.token)
          }
        })
      })
    }
  },

  login(email, password) {
    HttpAPI.login(email, password, (err, res) => {
      if (err) {
        return AppDispatcher.dispatch({
          type: ActionTypes.FAILED_AUTH,
          params: err
        })
      }
      LocalStorage.set('token', res.body.token)
      AppDispatcher.dispatch({
        type: ActionTypes.STORE_USER,
        params: {
          user: _decodeUserFromToken(res.body.token)
        }
      })
    })
  },

  logout() {
    LocalStorage.remove('token')
    AppDispatcher.dispatch({
      type: ActionTypes.LOGOUT
    })
  },

  restoreSession() {
    var token = LocalStorage.get('token')
    if (token) {
      AppDispatcher.dispatch({
        type: ActionTypes.STORE_USER,
        params: {
          user: _decodeUserFromToken(token)
        }
      })
    }
  },

  updateUser(newData) {
    var token = LocalStorage.get('token')
    if (token) {
      HttpAPI.putUser(token, newData, (err, res) => {
        if (err) {
          return AppDispatcher.dispatch({
            type: ActionTypes.ERR_HTTP_USER_UPDATE,
            params: {
              error: err
            }
          })
        }
        LocalStorage.set('token', res.body.token)
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_USER,
          params: {
            user: _decodeUserFromToken(res.body.token)
          }
        })
      })
    }
  },

  searchUsers(query) {
    var token = LocalStorage.get('token')
    if (token) {
      HttpAPI.searchUsers(token, query, (err, res) => {
        AppDispatcher.dispatch({
          type: ActionTypes.STORE_SEARCH_RESULTS,
          params: {
            users: res.body.users
          }
        })
      })
    }
  }
}
