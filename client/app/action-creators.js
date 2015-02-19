import pathToUrl from 'path-to-url'
import RSVP from 'rsvp'
import request from 'superagent'
import AppDispatcher from './dispatcher'
import Constants from './constants'

export default {
  type: 'http',
  
  login(email, password) {
    return new RSVP.Promise((resolve, reject) => {
      request
        .post('/login')
        .send({email,password})
        .end((res) => {
          AppDispatcher.dispatch({
            type: Constants.User.RECEIVE_TOKEN,
            params: res.body.token
          })
          resolve()
        }).catch(reject)
    })
  },

  logout() {
    AppDispatcher.dispatch({
      type: Constants.User.LOGOUT
    })
  },

  restoreSession() {
    AppDispatcher.dispatch({
      type: Constants.User.RESTORE_SESSION
    })
  },

  searchUsers(query, done) {
    var url = '/users/search'
    request
      .get(url)
      .query({q: query})
      .end((res) => {
        done(res.body.users)
      })
  },

  fetchMessages(activityId) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    request
      .get(url)
      .end((res) => {
        AppDispatcher.dispatch({
          type: Constants.Message.RECEIVE_MESSAGES,
          params: {
            activityId,
            messages: res.body.messages
          }
        })
      })
  },

  fetchActivities() {
    request
      .get('/activity')
      .end((res) => {
        AppDispatcher.dispatch({
          type: Constants.Activity.RECEIVE_ACTIVITIES,
          params: {
            activities: res.body.activities
          }
        })
      })
  },

  postMessage(activityId, message) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    request
      .post(url)
      .send(message)
      .end((res) => {
        console.log('Posted', res.body)
      })
  },

  stopMessageStream() {
    if (this.evtSource) {
      console.log('Source, Closing Stream')
      this.evtSource.removeEventListener('message', this._streamListener)
      this.evtSource.close()
      this.evtSource = null
    }
  },

  killMessageCache(activityId) {
    AppDispatcher.dispatch({
      type: Constants.Message.KILL_MESSAGE_CACHE,
      params: {activityId}
    })
  },

  getMessageStream(activityId) {
    var url = pathToUrl('/activity/:activityId/messages/stream',
                        {activityId})
    this.evtSource = new EventSource(url)
    this.evtSource.addEventListener('message', this._streamListener)
  },

  _streamListener() {
    try {
      var message = JSON.parse(event.data)
      AppDispatcher.dispatch({
        type: Constants.Message.RECEIVE_MESSAGES,
        params: {
          activityId: message.activityId,
          messages: [message]
        }
      })
    } catch (exp) {
      console.log(exp)
      throw exp
    }
  },

}

