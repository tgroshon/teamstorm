import { Message as MessageConstants } from '../constants'
import { List, Map as iMap } from 'immutable'
import assign from 'object-assign'
import AppDispatcher from '../dispatcher'
import { EventEmitter } from 'events'

var messages = iMap()

var MessageStore = assign({}, EventEmitter.prototype, {
  name: 'Message',

  killMessageCache(activityId) {
    // TODO: Refactor to allow behind-the-scene subscripting to changes
    messages = messages.delete(activityId)
    this.emit('message')
  },

  editMessage(activityId, message) {
    //TODO: lookup the message
  },

  receiveMessages(activityId, newMessages) {
    var messagesForActivity = messages.get(activityId)
    if (List.isList(messagesForActivity)) {
      messagesForActivity = messagesForActivity.concat(List(newMessages))
    } else {
      messagesForActivity = List(newMessages)
    }
    messages = messages.set(activityId, messagesForActivity)
    this.emit('message')
  },

  getAll(activityId) {
    var allMessages = messages.get(activityId)
    return allMessages ? allMessages.toArray() : []
  }
})

MessageStore.dispatchToken = AppDispatcher.register((payload) => {
  var params = payload.params

  switch(payload.type) {

    case MessageConstants.RECEIVE_MESSAGES:
      MessageStore.receiveMessages(params.activityId, params.messages)
      break

    case MessageConstants.KILL_MESSAGE_CACHE:
      MessageStore.killMessageCache(params.activityId)
      break

    default:
      // do nothing
  }
})

export default MessageStore
