import { Team as TeamConstants } from '../constants'
import StormHttpAPI from '../sources/storm-http-api'
import LocalStorage from '../sources/local-storage'
import assign from 'object-assign'
import AppDispatcher from '../dispatcher'
import Immutable from 'immutable'
import { EventEmitter } from 'events'

var StoreData = Immutable.Map()

var TeamStore = assign({}, EventEmitter.prototype, {
  name: 'Team',

  getTeams() {
    StoreData.get('teams')
  }
})

TeamStore.dispatchToken = AppDispatcher.register(function(payload) {
  var params = payload.params

  switch(payload.type) {

    case TeamConstants.STORE_TEAMS:
      StoreData.set('teams', Immutable.fromJS(params.teams))
      break

    default:
      // do nothing
  }
})

export default TeamStore
