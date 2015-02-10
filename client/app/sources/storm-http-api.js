import Marty from 'marty'
import SourceActionCreators from '../source-action-creators'
import pathToUrl from 'path-to-url'
import RSVP from 'rsvp'

export default Marty.createStateSource({
  type: 'http',
  
  login(email, password) {
    return new RSVP.Promise((resolve, reject) => {
      this.post({
        url: '/login',
        body: {
          email,
          password
        }
      }).then((res) => {
        SourceActionCreators.receiveToken(res.body.token)
        resolve()
      }).catch(reject)
    })
  },

  logout() {
    SourceActionCreators.destroyTokenAndUser(res.body.token)
  },

  fetchMessages(activityId) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    return this.get(url).then((res) => {
      SourceActionCreators.receiveMessages(activityId, res.body.messages)
    })
  },

  fetchActivities() {
    return this.get('/activity').then((res) => {
      SourceActionCreators.receiveActivities(res.body.activities)
    })
  },

  streamMessages(activityId, listener) {
    var url = pathToUrl('/activity/:activityId/messages/stream',
                        {activityId})
    this.evtSource = new EventSource(url)
    this.evtSource.addEventListener('message', listener)
  },

  closeMessageStream(listener) {
    if (this.evtSource) {
      console.log('Source, Closing Stream')
      this.evtSource.removeEventListener('message', listener)
      this.evtSource.close()
      this.evtSource = null
    }
  },

  postMessage(activityId, message) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    this.post({ url, body: message })
        .then((res) => {
          SourceActionCreators.receiveMessage(res.body)
        })
  }
})

