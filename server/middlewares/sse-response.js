export default function sseResponeMiddleware (req, res, next) {
  // set timeout as high as possible
  req.socket.setTimeout(Infinity)

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  res.emit = (payload, eventName) => {
    res.write('\n')
    if (eventName) {
      res.write('event: ' + eventName + '\n')
    }
    res.write('data: ' + payload + '\n\n')
  }

  next()
}

