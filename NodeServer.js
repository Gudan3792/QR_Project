const express = require('express');
const adminModule = require("./admin_module/lib");
const app = express();

app.use(express.static('images'));
app.use(express.static(__dirname + '/homepage_file'));
app.get('/',(req,res) => res.sendFile(__dirname + '/homepage_file/main/main.html'));

adminModule.initMethod.initDB("127.0.0.1",3306,"root","111111","project_sql");//db 초기화 함수
adminModule.initMethod.initAdminStaticPath("/admin_login/admin_main.html");//로그인 완료후 리다이렉트될 url

app.use("/api",adminModule.createApiRouter());



app.get('/about',(req,res)=>{
    res.send('about page');
});

app.listen(9000,function(){
    console.log('start 9000');
});