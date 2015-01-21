import dispatcher from '../dispatcher'
import { EventEmitter } from 'events'
import utils from 'utils'

var messages = []

var MessageStore = {

  getAll() {
    return messages.slice(0)
  }

}

utils.inherits(MessageStore, EventEmitter)

MessageStore.emit('bob')

