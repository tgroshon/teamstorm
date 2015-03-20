import Immutable from 'immutable'
import assign from 'object-assign'
import { EventEmitter } from 'events'
import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'

var StoreData = Immutable.Map({
  pending: false
})

var MessageStore = assign({}, EventEmitter.prototype, {
  name: 'MessageStore',

  pendingRequest() {
    return StoreData.get('pending')
  },

  getAll(activityId) {
    var allMessages = StoreData.get(activityId)
    return allMessages ? allMessages.toArray() : []
  }
})

MessageStore.dispatchToken = AppDispatcher.register((payload) => {
  var params = payload.params

  switch(payload.type) {

    case ActionTypes.STORE_MESSAGES:
      var messagesForActivity = StoreData.get(params.activityId)
      var messages = Immutable.fromJS(params.messages)
      if (Immutable.List.isList(messagesForActivity)) {
        messagesForActivity = messagesForActivity.concat(messages)
      } else {
        messagesForActivity = messages
      }
      StoreData = StoreData.set(params.activityId, messagesForActivity)
      StoreData = StoreData.set('pending', false)

      MessageStore.emit('change')
      break

    case ActionTypes.KILL_MESSAGE_CACHE:
      StoreData = StoreData.delete(params.activityId)
      MessageStore.emit('change')
      break

    case ActionTypes.PENDING_MESSAGE_REQUEST:
      StoreData = StoreData.set('pending', true)
      MessageStore.emit('change')

    case ActionTypes.LOGOUT:
      StoreData = Immutable.Map({
        pending: false
      })
      break

    default:
      // do nothing
  }
})

export default MessageStore
