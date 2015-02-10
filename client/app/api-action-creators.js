import Marty from 'marty'
import Constants from './constants'
import StormHttpAPI from './sources/storm-http-api'

//TODO Refactor me
export default Marty.createActionCreators({
  login: Constants.User.LOGIN(function(email, password) {
    return StormHttpAPI.login(email, password)
  }),
})

