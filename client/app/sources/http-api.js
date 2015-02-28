import pathToUrl from 'path-to-url'
import request from 'superagent'

var EventSourceCache = {}

export default {

  login(email, password, done) {
    request
      .post('/login')
      .send({email,password})
      .end(done)
  },

  searchUsers(token, query, done) {
    var url = '/users/search'
    request
      .get(url)
      .query({q: query})
      .end(done)
  },

  fetchMessages(token, activityId, done) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    request
      .get(url)
      .end(done)
  },

  fetchActivities(token, done) {
    request
      .get('/activity')
      .end(done)
  },

  postMessage(token, activityId, message, done) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    request
      .post(url)
      .send(message)
      .end(done)
  },

  getMessageStream(token, activityId, listener) {
    var url = pathToUrl('/activity/:activityId/messages/stream',
                        {activityId})
    // TODO refactor to use EventSourceCache
    this.evtSource = new EventSource(url)
    this.evtSource.addEventListener('message', listener)
  },


  stopMessageStream(listener) {
    if (this.evtSource) {
      console.log('Source, Closing Stream')
      this.evtSource.removeEventListener('message', listener)
      this.evtSource.close()
      this.evtSource = null
    }
  },
}
