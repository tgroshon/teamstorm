import assign from 'object-assign'
import Immutable from 'immutable'
import { EventEmitter } from 'events'
import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'

let StoreData = Immutable.Map({
  teams: Immutable.Map(),
  members: Immutable.Map()
})

let TeamStore = assign({}, EventEmitter.prototype, {
  name: 'Team',

  get(teamId) {
    return StoreData.get('teams').get(teamId)
  },

  getTeams() {
    return StoreData.get('teams').toArray()
  }
})

TeamStore.dispatchToken = AppDispatcher.register(payload => {
  let params = payload.params

  switch(payload.type) {

    case ActionTypes.STORE_TEAMS:
      let teams = Immutable.fromJS(params.teams)
      let newTeamMap = teams.reduce((map, team) => {
        return map.set(team.get('id'), team)
      }, Immutable.Map())
      let latestTeams = StoreData.get('teams').merge(newTeamMap)
      StoreData = StoreData.set('teams', latestTeams)
      TeamStore.emit('change')
      break

    case ActionTypes.LOGOUT:
      StoreData = Immutable.Map({
        teams: Immutable.Map()
      })
      break

    default:
      // do nothing
  }
})

export default TeamStore
