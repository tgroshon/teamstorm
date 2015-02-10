import Marty from 'marty'
import ActionCreators from '../action-creators'
import pathToUrl from 'path-to-url'

export default Marty.createStateSource({
  namespace: 'teamstorm:',
  type: 'localStorage',

  setToken(token) {
    this.set('token', token)
  },

  getToken() {
    return this.get('token')
  }
})

