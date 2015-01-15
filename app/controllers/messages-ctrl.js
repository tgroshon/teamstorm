'use strict'

module.exports = {
  eventStream: function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
    res.write('\n')
    res.write('data: simple message\n\n') // Note the extra newline
    setInterval(function() {
      res.write('event: date\n') // Note the extra newline
      res.write("data: " + (new Date()).toString() + '\n\n') // Note the extra newline
    }, 1000)
  }
}
