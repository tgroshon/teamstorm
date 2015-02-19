import assign from 'object-assign'
import { EventEmitter } from 'events'
import { User as UserConstants } from '../constants'
import LocalStorage from '../sources/local-storage'
import AppDispatcher from '../dispatcher'

var user = null
var token = null

var UserStore = assign({}, EventEmitter.prototype, {
  name: 'User',

  restoreSession() {
    var lastUser = LocalStorage.get('user')
    var lastToken = LocalStorage.get('token')
    if (user && token) {
      user = lastUser
      token = lastToken
    }
  },

  receiveToken(newToken) {
    var decodedPieces = newToken.split('.').map((segment) => {
      return window.atob(segment)
    })
    LocalStorage.set('user', decodedPieces[1])
    LocalStorage.set('token', token)
    user = decodedPieces[1]
    token = newToken
  },

  destroyTokenAndUser() {
    console.log('Store, Destroy locals and set state')
    LocalStorage.set('token', "")
    LocalStorage.set('user', "")
    user = null
    token = null
  },

  getUser() {
    //TODO clone?
    return user
  },

  getToken() {
    //TODO clone?
    return token
  },

})

UserStore.dispatchToken = AppDispatcher.register((payload) => {
  var params = payload.params

  switch(payload.type) {

    case UserConstants.RESTORE_SESSION:
      UserStore.restoreSession()
      break

    case UserConstants.RECEIVE_TOKEN:
      UserStore.receiveToken(params)
      break

    case UserConstants.LOGOUT:
      UserStore.destroyTokenAndUser()
      break

    default:
      // do nothing
  }
})

export default UserStore
