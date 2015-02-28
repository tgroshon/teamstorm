
export default {
  namespace: 'teamstorm:',

  get(key) {
    return localStorage.getItem(this.namespace + key)
  },

  set(key, object) {
    return localStorage.setItem(this.namespace + key, object)
  },

  remove(key) {
    return localStorage.removeItem(this.namespace + key)
  }
}

