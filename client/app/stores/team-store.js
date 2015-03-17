import assign from 'object-assign'
import Immutable from 'immutable'
import { EventEmitter } from 'events'
import AppDispatcher from '../dispatcher'
import Constants from '../constants'

const TeamConstants = Constants.Team

var StoreData = Immutable.Map({
  teams: Immutable.Map()
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
      let teams = Immutable.fromJS(params.teams)
      let newTeamMap = teams.reduce((map, team) => {
        return map.set(team.get('id'), team)
      }, Immutable.Map())
      let latestTeams = StoreData.get('teams').merge(newTeamMap)
      StoreData = StoreData.set('teams', latestTeams)
      TeamStore.emit('change')
      break

    default:
      // do nothing
  }
})

export default TeamStore
