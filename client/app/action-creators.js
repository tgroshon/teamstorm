import Marty from 'marty'
import Constants from './constants'

export default Marty.createActionCreators({
  newMessage: Constants.Message.NEW_MESSAGE(),
  receiveMessages: Constants.Message.RECEIVE_MESSAGES(),
  editMessage: Constants.Message.EDIT_MESSAGE(),
  newActivity: Constants.Activity.NEW_ACTIVITY(),
  receiveActivities: Constants.Activity.RECEIVE_ACTIVITIES(),
  getMessageStream: Constants.Message.GET_MESSAGE_STREAM(),
  stopMessageStream: Constants.Message.STOP_MESSAGE_STREAM(),
})

