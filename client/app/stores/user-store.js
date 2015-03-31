import assign from 'object-assign'
import { EventEmitter } from 'events'
import Immutable from 'immutable'
import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'

var StoreData = Immutable.Map({
  authenticated: false,
  user: null,
  searchResults: Immutable.List()
})

var UserStore = assign({}, EventEmitter.prototype, {
  name: 'UserStore',

  authenticated() {
    return StoreData.get('authenticated')
  },

  getUser() {
    return StoreData.get('user')
  },

  getSearchResults() {
    return StoreData.get('searchResults').toJS()
  }
})

UserStore.dispatchToken = AppDispatcher.register((payload) => {

  switch(payload.type) {

    case ActionTypes.STORE_SEARCH_RESULTS:
      StoreData = StoreData.merge({
        searchResults: payload.params.users
      })
      UserStore.emit('searchresults')
      UserStore.emit('change')
      break

    case ActionTypes.STORE_USER:
      StoreData = StoreData.merge({
        user: payload.params.user,
        authenticated: true
      })
      UserStore.emit('login')
      UserStore.emit('change')
      break

    case ActionTypes.LOGOUT:
      StoreData = StoreData.remove('user')
      StoreData = StoreData.set('authenticated', false)
      UserStore.emit('logout')
      UserStore.emit('change')
      break

    case ActionTypes.FAILED_AUTH:
      StoreData = StoreData.merge({
        authenticated: false,
        validationErrors: payload.params.validationErrors
      })
      UserStore.emit('authfail')
      UserStore.emit('change')
      break

    default:
      // do nothing
  }
})

export default UserStore
