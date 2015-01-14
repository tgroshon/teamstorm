'use strict';

var express = require('express');
var router = express.Router();
var rdb = require('./rdb');

router.get('/events', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.write('\n');
  res.write('data: simple message\n\n'); // Note the extra newline
  setInterval(function() {
    res.write('event: date\n'); // Note the extra newline
    res.write("data: " + (new Date()).toString() + '\n\n'); // Note the extra newline
  }, 1000);
});

router.get('/users', function (req, res) {
  rdb.getUsers(function (err, users) {
    res.json({ 'users': users });
  });
});

module.exports = router;
