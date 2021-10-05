var express = require('express')
var app = express()

app.listen(8484);

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})

app.use(express.static('public'))
