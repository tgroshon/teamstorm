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
      .set('jwt', token)
      .query({q: query})
      .end(done)
  },

  putUser(token, user, done) {
    request
      .put('/users')
      .set('jwt', token)
      .send(user)
      .end(done)
  },

  fetchTeams(token, done) {
    request
      .get('/teams')
      .set('jwt', token)
      .end(done)
  },

  postTeam(token, team, done) {
    request
      .post('/teams')
      .set('jwt', token)
      .send(team)
      .end(done)
  },

  fetchMessages(token, activityId, done) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    request
      .get(url)
      .set('jwt', token)
      .end(done)
  },

  fetchActivities(token, done) {
    request
      .get('/activity')
      .set('jwt', token)
      .end(done)
  },

  postMessage(token, activityId, message, done) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    request
      .post(url)
      .set('jwt', token)
      .send({payload: message})
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
