import pathToUrl from 'path-to-url'
import request from 'superagent'

var EventSourceCache = {}

export default {

  postUser(user, done) {
    request
      .post('/users')
      .send(user)
      .end(done)
  },

  login(email, password, done) {
    request
      .post('/login')
      .send({email,password})
      .end(done)
  },

  searchUsers(token, query, done) {
    request
      .get('/users/search')
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

  putTeam(token, team, done) {
    request
      .put('/teams')
      .set('jwt', token)
      .send(team)
      .end(done)
  },

  postActivity(token, activity, done) {
    request
      .post('/activity')
      .set('jwt', token)
      .send(activity)
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

  fetchUsers(token, userIds, done) {
    request
      .get('/users')
      .query({ users: userIds })
      .set('jwt', token)
      .end(done)
  },

  postMessage(token, activityId, message, done) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    request
      .post(url)
      .set('jwt', token)
      .send(message)
      .end(done)
  },

  getMessageStream(token, activityId, listener) {
    var url = pathToUrl('/activity/:activityId/messages/stream',
                        {activityId})
    // TODO refactor to use EventSourceCache
    this.evtSource = new EventSource(url)
    console.log('Source, Opening Stream', activityId)
    this.evtSource.addEventListener('message', listener)
  },


  stopMessageStream(listener) {
    if (this.evtSource) {
      console.log('Source, Closing last Stream')
      this.evtSource.removeEventListener('message', listener)
      this.evtSource.close()
      this.evtSource = null
    }
  },
}
