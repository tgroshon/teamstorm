import Marty from 'marty'
import ActionCreators from '../action-creators'
import pathToUrl from 'path-to-url'

export default Marty.createStateSource({
  type: 'http',

  fetchMessages(activityId) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    return this.get(url).then(function (res) {
      ActionCreators.receiveMessages(res.body.messages);
    });
  },

  fetchActivities() {
    return this.get('/activity').then((res) => {
      ActionCreators.receiveActivities(res.body.activities);
    });
  },

  streamMessages(activityId, listener) {
    console.log('Streaming from', activityId)
    var url = pathToUrl('/activity/:activityId/messages/stream',
                        {activityId})
    this.evtSource = new EventSource(url)
    this.evtSource.addEventListener('message', listener)
  },

  closeMessageStream(listener) {
    if (this.evtSource) {
      console.log('Closing Stream')
      this.evtSource.removeEventListener('message', listener)
      this.evtSource.close()
      this.evtSource = null
    }
  },

  postMessage(message) {
    var url = pathToUrl('/activity/:activityId/messages', {activityId})
    this.post({ url, body: message })
        .then(function (res) {
          ActionCreators.receiveMessage(res.body);
        });
  }
});
