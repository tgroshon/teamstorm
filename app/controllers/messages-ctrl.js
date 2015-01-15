'use strict'

module.exports = {
  eventStream: function(req, res) {
    res.emit('Dates coming', 'date')

    setInterval(function() {
      res.emit((new Date()).toString(), 'date')
    }, 1000)

    setInterval(function() {
      res.emit('Another Day', 'date')
    }, 1530)
  }
}
