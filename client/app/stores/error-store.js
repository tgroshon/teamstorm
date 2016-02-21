import assign from 'object-assign'
import { EventEmitter } from 'events'
import Immutable from 'immutable'
import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'

var StoreData = Immutable.Map()

var ErrorStore = assign({}, EventEmitter.prototype, {
  name: 'ErrorStore',

  get (key) {
    return StoreData.get(key)
  },

  hasErrors () {
    return StoreData.size > 0
  },

  currentErrors () {
    return [...StoreData.entries()]
  }
})

ErrorStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.type) {

    case ActionTypes.ERR_HTTP_USER_UPDATE:
      StoreData = StoreData.set(ActionTypes.ERR_HTTP_USER_UPDATE,
                                payload.params.error)
      ErrorStore.emit(ActionTypes.ERR_HTTP_USER_UPDATE)
      break

    case ActionTypes.ERR_HTTP_POST_MESSAGE:
      let messageStoreValue = Immutable.Map({
        error: payload.params.error,
        data: payload.params.data
      })
      StoreData = StoreData.set(ActionTypes.ERR_HTTP_POST_MESSAGE,
                                messageStoreValue)
      ErrorStore.emit(ActionTypes.ERR_HTTP_POST_MESSAGE)
      break

    case ActionTypes.ERR_HTTP_POST_ACTIVITY:
      let activityStoreValue = Immutable.Map({
        error: payload.params.error,
        data: payload.params.data
      })
      StoreData = StoreData.set(ActionTypes.ERR_HTTP_POST_ACTIVITY,
                                activityStoreValue)
      ErrorStore.emit(ActionTypes.ERR_HTTP_POST_ACTIVITY)
      break

    case ActionTypes.CLEAR_ERR:
      StoreData = StoreData.delete(payload.params.name)
      break

    case ActionTypes.LOGOUT:
      StoreData = Immutable.Map()
      break

    default:
      // do nothing
  }
})

export default ErrorStore
