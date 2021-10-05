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
