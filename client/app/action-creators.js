import Marty from 'marty'
import Constants from './constants'

export default Marty.createActionCreators({
  newActivity: Constants.Activity.NEW_ACTIVITY(),
  receiveActivities: Constants.Activity.RECEIVE_ACTIVITIES(),

  newMessage: Constants.Message.NEW_MESSAGE(),
  receiveMessages: Constants.Message.RECEIVE_MESSAGES(),
  editMessage: Constants.Message.EDIT_MESSAGE(),
  getMessageStream: Constants.Message.GET_MESSAGE_STREAM(),
  stopMessageStream: Constants.Message.STOP_MESSAGE_STREAM(),
  killMessageCache: Constants.Message.KILL_MESSAGE_CACHE(),

  restoreSession: Constants.User.RESTORE_SESSION(),
  createUser: Constants.User.CREATE_USER(),
  login: Constants.User.LOGIN(),
  logout: Constants.User.LOGOUT(),
  receiveToken: Constants.User.RECEIVE_TOKEN(),
  receiveUser: Constants.User.RECEIVE_USER(),
})

