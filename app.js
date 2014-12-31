var express = require('express')
var routes = require('./server/routes');
var rdb = require('./server/rdb');
var app = express();

rdb.setup(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(routes);

  var server = app.listen(3000, function () {
      var host = server.address().address
      var port = server.address().port
      console.log('App listening at on Port %s', port)
  })
});
