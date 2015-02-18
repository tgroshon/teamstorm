import Marty from 'marty'
import Constants from './constants'
import StormHttpAPI from './sources/storm-http-api'
import LocalStorage from './sources/local-storage'
import MessageStore from './stores/message-store'
import UserStore from './stores/user-store'

export default Marty.createActionCreators({
  createUser: Constants.User.CREATE_USER(),
  logout: Constants.User.LOGOUT(),
  login: Constants.User.LOGIN(function(email, password) {
    return StormHttpAPI.login(email, password)
  }),
  searchUsers: Constants.User.SEARCH_USERS(function(query, done) {
    console.log('In the Action Creator')
    StormHttpAPI.searchUsers(query, done)
  }),

  restoreSession: Constants.User.RESTORE_SESSION(),
  newMessage: Constants.Message.NEW_MESSAGE(function(activityId, message) {
    StormHttpAPI.postMessage(activityId, message)
  }),
  getMessageStream: Constants.Message.GET_MESSAGE_STREAM(function(activityId) {
    StormHttpAPI.streamMessages(activityId, MessageStore.messageServerEventListener.bind(MessageStore))
  }),
  stopMessageStream: Constants.Message.STOP_MESSAGE_STREAM(function() {
    StormHttpAPI.closeMessageStream(MessageStore.messageServerEventListener)
  }),
  killMessageCache: Constants.Message.KILL_MESSAGE_CACHE(),
})

