import Marty from 'marty'
import { Message as MessageConstants } from '../constants'
import { List } from 'immutable'
import StormHttpAPI from '../sources/storm-http-api'

export default Marty.createStore({
  name: 'Message',

  getInitialState() {
    return {
      messages: List()
    }
  },

  handlers: {
    newMessage: MessageConstants.NEW_MESSAGE,
    receiveMessages: MessageConstants.RECEIVE_MESSAGES,
    editMessage: MessageConstants.EDIT_MESSAGE
  },

  newMessage(message) {
    this.setState({ messages: this.state.messages.push(message)})
  },

  receiveMessages(messages) {
    this.setState({
      messages: this.state.messages.concat(List(messages))
    })
  },

  editMessage(message) {
    //TODO: lookup the message
  },

  getAll(activityId) {
    var id = `activity-${activityId}-messages`

    return this.fetch({
      id,
      locally: () => {
        if (this.hasAlreadyFetched(id)) {
          return this.state.messages
        }
        return undefined
      },
      remotely: () => {
        // return the promise
        return StormHttpAPI.fetchMessages(activityId)
      }
    })
  }
})
