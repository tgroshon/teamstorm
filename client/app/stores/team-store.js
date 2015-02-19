import { Team as TeamConstants } from '../constants'
import StormHttpAPI from '../sources/storm-http-api'
import LocalStorage from '../sources/local-storage'
import assign from 'object-assign'
import AppDispatcher from '../dispatcher'
import { EventEmitter } from 'events'

var teams = []

var TeamStore = assign({}, EventEmitter.prototype, {
  name: 'Team',

  receiveTeams(teams) {
    teams = teams
  },
})

TeamStore.dispatchToken = AppDispatcher.register(function(payload) {
  var params = payload.params

  switch(payload.type) {

    case TeamConstants.RECEIVE_TEAMS:
      TeamStore.receiveTeams(params)
      break

    default:
      // do nothing
  }
})

export default TeamStore
