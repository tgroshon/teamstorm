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
    logger.trace('Queue has objects', actionQueue)
    if (dispatcher.isDispatching()) {
      logger.trace('reschedule for later')
      timeoutId = setTimeout(startProcessing, 100)
      return
    }
    var payload = actionQueue.shift()
    logger.trace('Ready to process', payload)
    dispatcher.dispatch(payload)
  }
  isProcessing = false
}

var AppDispatcher = {
  isProcessing() {
    return isProcessing
  },

  dispatch(payload) {
    logger.trace('Payload received. Queuing')
    queueAction(payload)
  },

  register(callback) {
    return dispatcher.register(callback)
  }
}

module.exports = AppDispatcher
