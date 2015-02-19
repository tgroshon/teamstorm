import ActionCreators from '../action-creators'
import pathToUrl from 'path-to-url'

export default {
  namespace: 'teamstorm:',
  type: 'localStorage',

  get(key) {
    return localStorage.getItem(this.namespace + key)
  },

  set(key, object) {
    return localStorage.setItem(this.namespace + key, object)
  },
}

