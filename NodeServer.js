const express = require('express');
const adminModule = require("./admin_module/lib");
const app = express();
var db_config = require(__dirname + '/SQLjs.js');
var conn = db_config.init();

db_config.connect(conn);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('images'));
app.use(express.static(__dirname + '/homepage_file'));
// app.get('/',(req,res) => res.sendFile(__dirname + '/homepage_file/main/main.html'));

app.get('/', function (req, res) {
    var sql = 'SELECT * FROM menu';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('main.ejs', {list : rows});
    });
});

// adminModule.initMethod.initDB("127.0.0.1",3306,"root","111111","project_sql");//db 초기화 함수
adminModule.initMethod.initAdminStaticPath("/admin_login/admin_main.html");//로그인 완료후 리다이렉트될 url

app.use("/api",adminModule.createApiRouter());

app.listen(9000,function(){
    console.log('start 9000');
});