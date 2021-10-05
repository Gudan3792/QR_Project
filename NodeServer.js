var express = require('express')
var Server = express()

Server.listen(8484);

Server.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})

Server.get('/main', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})

Server.use(express.static('public'))
