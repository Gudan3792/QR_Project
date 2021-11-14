const express = require('express');
const adminModule = require("./admin_module/lib");
const app = express();
var db_config = require(__dirname + '/SQLjs.js');
var conn = db_config.init();
var bodyParser = require('body-parser');

db_config.connect(conn);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static('images'));
app.use(express.static(__dirname + '/homepage_file'));

app.get('/', function (req, res) {
    var sql = 'SELECT * FROM menu';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('main.ejs', {list : rows});
    });
});

app.get('/admin_login/admin_main', function (req, res) {
    var sql = 'SELECT * FROM sales';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('admin_main.ejs', {list : rows});
    });
});

app.post('/admin_login/admin_main2', function (req, res) {
    var sql = 'SELECT * FROM menu';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('admin_main2.ejs', {list : rows});
    });
});

app.post('/writeAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'INSERT INTO `menu` VALUES(?,?, ?, NOW())';
    var params = [body.id, body.name, body.price];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
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
        if(err) console.log('query is not excuted. insert fail...\n' + err);
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
        if(err) console.log('query is not excuted. insert fail...\n' + err);
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
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.redirect('/admin_login/admin_main2');
    });
});

adminModule.initMethod.initAdminStaticPath("/admin_login/admin_main");//로그인 완료후 리다이렉트될 url

app.use("/api",adminModule.createApiRouter());

app.listen(9000,function(){
    console.log('start 9000');
});