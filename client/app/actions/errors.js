import AppDispatcher from '../dispatcher'
import { ActionTypes } from '../constants'

export default {
  clearError(name) {
    AppDispatcher.dispatch({
      type: ActionTypes.CLEAR_ERR,
      params: { name }
    })
  }
}
