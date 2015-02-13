import Marty from 'marty'
import { Team as TeamConstants } from '../constants'
import StormHttpAPI from '../sources/storm-http-api'
import LocalStorage from '../sources/local-storage'

export default Marty.createStore({
  name: 'Team',

  getInitialState() {
    return {
      teams: null
    }
  },

  handlers: {
    receiveTeams: TeamConstants.RECEIVE_TEAMS,
  },

  receiveTeams() {

  },
})

