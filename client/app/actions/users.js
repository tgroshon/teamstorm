import AppDispatcher from '../dispatcher'
import Constants from '../constants'
import HttpAPI from '../sources/http-api'
import LocalStorage from '../sources/local-storage'

function _decodeUserFromToken(token) {
  return JSON.parse(window.atob(token.split('.')[1]))
}

export default {
  login(email, password) {
    HttpAPI.login(email, password, (err, res) => {
      if (err) {
        return AppDispatcher.dispatch({
          type: Constants.User.FAILED_AUTH,
          params: err
        })
      }
      LocalStorage.set('token', res.body.token)
      AppDispatcher.dispatch({
        type: Constants.User.STORE_USER,
        params: {
          user: _decodeUserFromToken(res.body.token)
        }
      })
    })
  },

  logout() {
    LocalStorage.remove('token')
    AppDispatcher.dispatch({
      type: Constants.User.LOGOUT
    })
  },

  restoreSession() {
    var token = LocalStorage.get('token')
    if (token) {
      AppDispatcher.dispatch({
        type: Constants.User.STORE_USER,
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
            type: Constants.Error.ERR_HTTP_USER_UPDATE,
            params: {
              error: err
            }
          })
        }
        LocalStorage.set('token', res.body.token)
        AppDispatcher.dispatch({
          type: Constants.User.STORE_USER,
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
          type: Constants.User.STORE_SEARCH_RESULTS,
          params: {
            users: res.body.users
          }
        })
      })
    }
  }
}
