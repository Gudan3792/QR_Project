const express = require('express');
const path = require('path');
const app = express();
const adminModule = require("./admin_module/lib");
var db_config = require(__dirname + '/SQLjs.js');
var conn = db_config.init();
var bodyParser = require('body-parser');

db_config.connect(conn);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(__dirname + '/homepage_file'));
app.use(express.static(path.join(__dirname,'views')));
app.get('/', function (req, res) {
    var sql = 'SELECT * FROM menu';    
    conn.query(sql, function (err, rows) {
        if(err) console.log(err);
        else res.render('main.ejs', {list : rows});
    });
});

var Iamport = require('iamport');
var iamport = new Iamport({
  impKey: '7397847816519153',
  impSecret: '4228312352ed2bfb2571bffdb1f21e17d6840b4913db97788a1f2064ae70520426996c9e2f3a1b07'
});

app.get('/admin_login/admin_main',(req,res)=>{
    iamport.payment.getByStatus({
      payment_status: 'all' ,
      sorting : '-updated',
      limit : '500'
    }).then(function(result){
        res.render('admin_main.ejs',{list:result.list});
    }).catch(function(error){
        console.log(error);
        red.send(error);
    })
});

app.get('/admin_login/admin_main2', function (req, res) {
    var sql = 'SELECT * FROM menu';    
    conn.query(sql, function (err, rows) {
        if(err) console.log(err);
        else res.render('admin_main2.ejs', {list : rows});
    });
});

app.post('/writeAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'INSERT INTO `menu` VALUES(?,?, ?, NOW(),?)';
    var params = [body.id, body.name, body.price,body.img];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log(err);
        else res.redirect('/admin_login/admin_main2');
    });
});

app.post('/deleteAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'DELETE FROM `menu` WHERE name = ?';
    var params = [body.name];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log(err);
        else res.redirect('/admin_login/admin_main2');
    });
});

app.post('/updataAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'UPDATE `menu` SET name = ? WHERE id =?';
    var params = [body.name, body.id];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log(err);
        else res.redirect('/admin_login/admin_main2');
    });
});

app.post('/Pr_updataAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'UPDATE `menu` SET price = ? WHERE id =?';
    var params = [body.price, body.id];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log(err);
        else res.redirect('/admin_login/admin_main2');
    });
});

app.post('/img_updataAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'UPDATE `menu` SET img = ? WHERE id =?';
    var params = [body.img, body.id];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log(err);
        else res.redirect('/admin_login/admin_main2');
    });
});

adminModule.initMethod.initAdminStaticPath("/admin_login/admin_main");//로그인 완료후 리다이렉트될 url

app.use("/api",adminModule.createApiRouter());



app.listen(9000,function(){
    console.log('start 9000');
});