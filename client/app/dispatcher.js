import {Dispatcher} from 'flux'

var dispatcher = new Dispatcher()
var actionQueue = []
var isProcessing = false

function queueAction (payload) {
  actionQueue.push(payload)
  if (!isProcessing) {
    startProcessing()
  }
}

function startProcessing () {
  isProcessing = true
  while (actionQueue.length > 0) {
    if (dispatcher.isDispatching()) {
      return setTimeout(startProcessing, 100)
    }
    var payload = actionQueue.shift()
    dispatcher.dispatch(payload)
  }
  isProcessing = false
}

export default {
  isProcessing () {
    return isProcessing
  },

  dispatch (payload) {
    queueAction(payload)
  },

  register (callback) {
    return dispatcher.register(callback)
  }
}
