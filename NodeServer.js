const express = require('express');
const app = express();

app.use(express.static('images'));
app.use(express.static(__dirname + '/css'));
app.get('/',(req,res) => res.sendFile(__dirname + '/css/main/main.html'));

app.get('/about',(req,res)=>{
    res.send('about page');
});

app.listen(9000,function(){
    console.log('start 9000');
});