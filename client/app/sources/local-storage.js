import logger from '../logger'

export default {
  namespace: 'teamstorm:',

  get(key) {
    var item = localStorage.getItem(this.namespace + key)
    try {
      return typeof item === 'string' ? item : JSON.parse(item)
    } catch (e) {
      logger.trace(e.msg)
      return null
    }
  },

  set(key, object) {
    var payload = typeof object === 'string' ? object : JSON.stringify(object)
    return localStorage.setItem(this.namespace + key, payload)
  },

  remove(key) {
    return localStorage.removeItem(this.namespace + key)
  }
}

