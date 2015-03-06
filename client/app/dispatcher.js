import {Dispatcher} from 'flux'
import logger from './logger'

var dispatcher = new Dispatcher()
var actionQueue = []
var isProcessing = false

function queueAction(payload) {
  actionQueue.push(payload)
  if (!isProcessing) {
    startProcessing()
  }
}

function startProcessing() {
  isProcessing = true
  while (actionQueue.length > 0) {
    if (dispatcher.isDispatching()) {
      timeoutId = setTimeout(startProcessing, 100)
      return
    }
    var payload = actionQueue.shift()
    dispatcher.dispatch(payload)
  }
  isProcessing = false
}

var AppDispatcher = {
  isProcessing() {
    return isProcessing
  },

  dispatch(payload) {
    queueAction(payload)
  },

  register(callback) {
    return dispatcher.register(callback)
  }
}

module.exports = AppDispatcher
