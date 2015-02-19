var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer') 
var routes = require('./routes')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(express.static('/code/public'))
app.use(routes)

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('App listening at on Port %s', port)
})

module.exports = server
