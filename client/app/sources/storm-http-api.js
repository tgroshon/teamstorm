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

  streamMessages(listener) {
    var url = pathToUrl('/activity/:activityId/messages/stream',
                        {activityId})
    this.evtSource = new EventSource(url)
    this.evtSource.addEventListener('message', listener)
  },

  closeMessageStream(listener) {
    if (this.evtSource) {
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
