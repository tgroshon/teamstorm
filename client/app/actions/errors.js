import AppDispatcher from '../dispatcher'
import Constants from '../constants'

export default {
  clearError(name) {
    AppDispatcher.dispatch({
      type: Constants.Error.CLEAR_ERR,
      params: { name }
    })
  }
}
