<<<<<<< HEAD
var express = require('express')
var app = express()

app.listen(8484);

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})

// localhost:8484/main 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/main', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})
=======
var express = require('express')
var app = express()

app.listen(8484);

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})

// localhost:8484/main 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/main', function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
})
>>>>>>> fe35f8328bd076df8e4feb154e7d7f9a6cfbf4a5
