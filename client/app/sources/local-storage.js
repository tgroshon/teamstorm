import logger from '../logger'

export default {
  namespace: 'teamstorm:',

  get (key) {
    var item = window.localStorage.getItem(this.namespace + key)
    try {
      return typeof item === 'string' ? item : JSON.parse(item)
    } catch (e) {
      logger.trace(e.msg)
      return null
    }
  },

  set (key, object) {
    var payload = typeof object === 'string' ? object : JSON.stringify(object)
    return window.localStorage.setItem(this.namespace + key, payload)
  },

  remove (key) {
    return window.localStorage.removeItem(this.namespace + key)
  }
}

