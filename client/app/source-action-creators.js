import Marty from 'marty'
import Constants from './constants'

export default Marty.createActionCreators({
  newActivity: Constants.Activity.NEW_ACTIVITY(),
  receiveActivities: Constants.Activity.RECEIVE_ACTIVITIES(),

  receiveMessages: Constants.Message.RECEIVE_MESSAGES(),
  editMessage: Constants.Message.EDIT_MESSAGE(),

  receiveToken: Constants.User.RECEIVE_TOKEN(),
  receiveUser: Constants.User.RECEIVE_USER(),
})

