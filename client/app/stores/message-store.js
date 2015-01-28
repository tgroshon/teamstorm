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
    editMessage: MessageConstants.EDIT_MESSAGE,
    getStream: MessageConstants.GET_MESSAGE_STREAM,
    stopStream: MessageConstants.STOP_MESSAGE_STREAM,
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

  getStream(activityId) {
    console.log('Acquire Stream')
    StormHttpAPI.streamMessages(activityId, this.messageServerEventListener.bind(this))
  },

  stopStream() {
    console.log('Close Stream')
    StormHttpAPI.closeMessageStream(this.messageServerEventListener)
  },

  messageServerEventListener(event) {
    try {
      var message = JSON.parse(event.data)
      this.newMessage(message)
    } catch (exp) {
      console.log(exp)
      throw exp
    }
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
