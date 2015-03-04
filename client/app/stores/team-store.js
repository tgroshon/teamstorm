import { Team as TeamConstants } from '../constants'
import assign from 'object-assign'
import AppDispatcher from '../dispatcher'
import Immutable from 'immutable'
import { EventEmitter } from 'events'

var StoreData = Immutable.Map({
  teams: Immutable.List()
})

var TeamStore = assign({}, EventEmitter.prototype, {
  name: 'Team',

  getTeams() {
    return StoreData.get('teams').toArray()
  }
})

TeamStore.dispatchToken = AppDispatcher.register(function(payload) {
  var params = payload.params

  switch(payload.type) {

    case TeamConstants.STORE_TEAMS:
      console.log('Storing Teams', params.teams)
      StoreData = StoreData.set('teams', Immutable.fromJS(params.teams))
      TeamStore.emit('change')
      break

    default:
      // do nothing
  }
})

export default TeamStore
