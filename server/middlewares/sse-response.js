
module.exports = function(req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  res.emit = function(payload, eventName) {
    res.write('\n')
    if (eventName) {
      res.write('event: ' + eventName + '\n')
    }
    res.write('data: ' + payload + '\n\n')
  }

  next()
}
