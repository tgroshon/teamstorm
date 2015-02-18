import Marty from 'marty'
import { User as UserConstants } from '../constants'
import StormHttpAPI from '../sources/storm-http-api'
import LocalStorage from '../sources/local-storage'

export default Marty.createStore({
  name: 'User',

  getInitialState() {
    return {
      user: null,
      token: null,
      searchedUsers: []
    }
  },

  handlers: {
    restoreSession: UserConstants.RESTORE_SESSION,
    destroyTokenAndUser: UserConstants.LOGOUT,
    receiveToken: UserConstants.RECEIVE_TOKEN,
    receiveSearchedUsers: UserConstants.RECEIVE_SEARCHED_USERS
  },

  receiveSearchedUsers(users) {
    this.setState({searchedUsers: users})
  },

  restoreSession() {
    var user = LocalStorage.get('user')
    var token = LocalStorage.get('token')
    if (user && token) {
      this.setState({user, token})
    }
  },

  receiveToken(token) {
    var decodedPieces = token.split('.').map((segment) => {
      return window.atob(segment)
    })
    LocalStorage.set('user', decodedPieces[1])
    LocalStorage.set('token', token)
    this.setState({user: decodedPieces[1], token: token})
  },

  destroyTokenAndUser() {
    console.log('Store, Destroy locals and set state')
    LocalStorage.set('token', "")
    LocalStorage.set('user', "")
    this.setState({user: null, token: null})
  },

  getUser() {
    //TODO clone?
    return this.state.user
  },

  getToken() {
    //TODO clone?
    return this.state.token
  },

})
