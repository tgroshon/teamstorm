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
    killMessageCache: MessageConstants.KILL_MESSAGE_CACHE,
    receiveMessages: MessageConstants.RECEIVE_MESSAGES,
    editMessage: MessageConstants.EDIT_MESSAGE,
  },

  killMessageCache(activityId) {
    // TODO: Refactor to allow behind-the-scene subscripting to changes
    this.setState({ messages: this.state.messages.delete(activityId) })
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

  messageServerEventListener(event) {
    try {
      var message = JSON.parse(event.data)
      this.receiveMessages(message.activityId, [message])
    } catch (exp) {
      console.log(exp)
      throw exp
    }
  },

  getAll(activityId) {
    var requestId = `activity-${activityId}-messages`

    return this.fetch({
      id: requestId,
      locally: () => {
        if (this.hasAlreadyFetched(requestId)) {
          return this.state.messages.get(activityId).toArray()
        }
      },
      remotely: () => {
        return StormHttpAPI.fetchMessages(activityId)
      }
    })
  }
})

