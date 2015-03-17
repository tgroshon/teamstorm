import AppDispatcher from '../dispatcher'
import Constants from '../constants'
import HttpAPI from '../sources/http-api'
import LocalStorage from '../sources/local-storage'


export default {
  fetchActivities() {
    var token = LocalStorage.get('token')
    if (token) {
      HttpAPI.fetchActivities(token, (err, res) => {
        if (err) {
          //TODO logging
          return
        }
        AppDispatcher.dispatch({
          type: Constants.Activity.STORE_ACTIVITIES,
          params: {
            activities: res.body.activities
          }
        })
      })
    }
  },

  createActivity(title, type, teamId) {
    var token = LocalStorage.get('token')
    if (token) {
      var activity = {title, type, teamId}
      HttpAPI.postActivity(token, activity, (err, res) => {
        if (err) {
          return AppDispatcher.dispatch({
            type: Constants.Error.ERR_HTTP_POST_ACTIVITY,
            params: {
              error: err,
              data: activity
            }
          })
        }
        AppDispatcher.dispatch({
          type: Constants.Activity.STORE_ACTIVITIES,
          params: {
            activities: [res.body]
          }
        })
      })
    }
  }
}
