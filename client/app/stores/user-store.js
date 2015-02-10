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
    }
  },

  handlers: {
    restoreSession: UserConstants.RESTORE_SESSION,
    //login: UserConstants.LOGIN,
    destroyTokenAndUser: UserConstants.LOGOUT,
    receiveToken: UserConstants.RECEIVE_TOKEN,
    createUser: UserConstants.CREATE_USER,
  },

  restoreSession() {
    var user = LocalStorage.get('user')
    var token = LocalStorage.get('token')
    if (user && token) {
      this.setState({user, token})
    }
  },

  login(email, password) {
    return StormHttpAPI.login(email, password)
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

  createUser(user) {

  },

})
