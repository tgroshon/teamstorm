import assign from 'object-assign'
import { EventEmitter } from 'events'
import Immutable from 'immutable'
import Constants from '../constants'
import AppDispatcher from '../dispatcher'

const ErrorConstants = Constants.Error
const UserConstants = Constants.User

var StoreData = Immutable.Map()

var ErrorStore = assign({}, EventEmitter.prototype, {
  name: 'ErrorStore',

  get(key) {
    return StoreData.get(key)
  },

  hasErrors() {
    return StoreData.size > 0
  },

  currentErrors() {
    return [...StoreData.entries()]
  }
})

ErrorStore.dispatchToken = AppDispatcher.register((payload) => {

  switch(payload.type) {

    case ErrorConstants.ERR_HTTP_USER_UPDATE:
      StoreData = StoreData.set(ErrorConstants.ERR_HTTP_USER_UPDATE,
                                payload.params.error)
      ErrorStore.emit(ErrorConstants.ERR_HTTP_USER_UPDATE)
      break

    case ErrorConstants.ERR_HTTP_POST_MESSAGE:
      var storageValue = Immutable.Map({
        error: payload.params.error,
        data: payload.params.data
      })
      StoreData = StoreData.set(ErrorConstants.ERR_HTTP_POST_MESSAGE,
                                storageValue)
      ErrorStore.emit(ErrorConstants.ERR_HTTP_POST_MESSAGE)
      break

    case ErrorConstants.ERR_HTTP_POST_ACTIVITY:
      var storageValue = Immutable.Map({
        error: payload.params.error,
        data: payload.params.data
      })
      StoreData = StoreData.set(ErrorConstants.ERR_HTTP_POST_ACTIVITY,
                                storageValue)
      ErrorStore.emit(ErrorConstants.ERR_HTTP_POST_ACTIVITY)
      break

    case ErrorConstants.CLEAR_ERR:
      StoreData = StoreData.delete(payload.params.name)
      break

    case UserConstants.LOGOUT:
      StoreData = Immutable.Map()
      break

    default:
      // do nothing
  }
})

export default ErrorStore
