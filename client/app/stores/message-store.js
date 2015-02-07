import Marty from 'marty'
import { Message as MessageConstants } from '../constants'
import { List, Map as iMap } from 'immutable'
import StormHttpAPI from '../sources/storm-http-api'

export default Marty.createStore({
  name: 'Message',

  getInitialState() {
    return {
      messages: iMap()
    }
  },

  handlers: {
    newMessage: MessageConstants.NEW_MESSAGE,
    killMessageCache: MessageConstants.KILL_MESSAGE_CACHE,
    receiveMessages: MessageConstants.RECEIVE_MESSAGES,
    editMessage: MessageConstants.EDIT_MESSAGE,
    getStream: MessageConstants.GET_MESSAGE_STREAM,
    stopStream: MessageConstants.STOP_MESSAGE_STREAM,
  },

  killMessageCache(activityId) {
    console.log('Store, killing message cache', activityId)
    this.setState({ messages: this.state.messages.delete(activityId) })
  },

  newMessage(activityId, message) {
    var messagesForActivity = this.state.messages.get(activityId)
    this.setState({
      messages: this.state.messages.set(activityId, messagesForActivity.push(message))
    })
  },

  editMessage(activityId, message) {
    //TODO: lookup the message
  },

  receiveMessages(activityId, messages) {
    var messagesForActivity = this.state.messages.get(activityId)
    if (List.isList(messagesForActivity)) {
      messagesForActivity = messagesForActivity.concat(List(messages))
    } else {
      messagesForActivity = List(messages)
    }
    this.setState({
      messages: this.state.messages.set(activityId, messagesForActivity)
    })
  },

  getStream(activityId) {
    console.log('Store, Acquire Stream')
    StormHttpAPI.streamMessages(activityId, this.messageServerEventListener.bind(this))
  },

  stopStream() {
    console.log('Store, Close Stream')
    StormHttpAPI.closeMessageStream(this.messageServerEventListener)
  },

  messageServerEventListener(event) {
    try {
      var message = JSON.parse(event.data)
      this.newMessage(message.activityId, message)
    } catch (exp) {
      console.log(exp)
      throw exp
    }
  },

  getAll(activityId) {
    var requestId = `activity-${activityId}-messages`
    console.log('Store getting', requestId)

    return this.fetch({
      id: requestId,
      locally: () => {
        if (this.hasAlreadyFetched(requestId)) {
          return this.state.messages.get(activityId)
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
