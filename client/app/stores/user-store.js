import assign from 'object-assign'
import { EventEmitter } from 'events'
import { User as UserConstants } from '../constants'
import LocalStorage from '../sources/local-storage'
import AppDispatcher from '../dispatcher'
import Immutable from 'immutable'

var StoreData = Immutable.Map()

var UserStore = assign({}, EventEmitter.prototype, {
  name: 'UserStore',

  authenticated() {
    return StoreData.get('authenticated')
  },

  getUser() {
    return StoreData.get('user')
  },

  getValidationErrors() {
    return StoreData.get('validationErrors')
  },

  getSearchResults() {
    return StoreData.get('searchResults').toJS()
  },

})

UserStore.dispatchToken = AppDispatcher.register((payload) => {

  switch(payload.type) {

    case UserConstants.STORE_SEARCH_RESULTS:
      StoreData = StoreData.merge({
        searchResults: payload.params.users
      })
      UserStore.emit('searchresults')
      break

    case UserConstants.STORE_USER:
      StoreData = StoreData.merge({
        user: payload.params.user,
        authenticated: true
      })
      UserStore.emit('login')
      UserStore.emit('change')
      break

    case UserConstants.LOGOUT:
      StoreData = StoreData.remove('user')
      StoreData = StoreData.set('authenticated', false)
      UserStore.emit('logout')
      UserStore.emit('change')
      break

    case UserConstants.FAILED_AUTH:
      StoreData = StoreData.merge({
        authenticated: false,
        validationErrors: payload.params.validationErrors
      })
      UserStore.emit('authfail')

    default:
      // do nothing
  }
})

export default UserStore
