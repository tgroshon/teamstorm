var express = require('express')
var bodyParser = require('body-parser');
var multer = require('multer'); 
var routes = require('./app/routes');
var rdb = require('./app/services/rdb-service');
var app = express();

rdb.setup(function() {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(multer()); // for parsing multipart/form-data
  app.use(express.static(__dirname + '/public'));
  app.use(routes);

  var server = app.listen(3000, function () {
      var host = server.address().address
      var port = server.address().port
      console.log('App listening at on Port %s', port)
  })
});
