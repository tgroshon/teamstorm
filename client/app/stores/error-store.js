import assign from 'object-assign'
import { EventEmitter } from 'events'
import { Error as ErrorConstants } from '../constants'
import AppDispatcher from '../dispatcher'
import Immutable from 'immutable'

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

    case ErrorConstants.CLEAR_ERR:
      StoreData = StoreData.delete(payload.params.name)
      break

    default:
      // do nothing
  }
})

export default ErrorStore
