const express = require('express');
const path = require('path');
const app = express();
const axios   = require('axios');
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

adminModule.initMethod.initAdminStaticPath("/admin_login/admin_main");//로그인 완료후 리다이렉트될 url

app.use("/api",adminModule.createApiRouter());

app.listen(9000,function(){
    console.log('start 9000');
});

var Iamport = require('iamport');
var iamport = new Iamport({
  impKey: '7397847816519153',
  impSecret: '4228312352ed2bfb2571bffdb1f21e17d6840b4913db97788a1f2064ae70520426996c9e2f3a1b07'
});

app.get('/admin_login/admin_main',(req,res)=>{
    iamport.payment.getByStatus({
      payment_status: 'all' , //list를 불러올 조건(전체 : all, 미결제 : ready, 결제완료 : paid, 결제취소 : cancelled, 결제실패 : failed)
      sorting : '-started', //불러온 list 정렬조건 (기본 : -started , 결제완료기준 : paid , 새로고침기준 : updated (-붙으면 내림차순) )
      limit : '1000' //불러온 list를 한페이지에 몇개나 불러올지 (스테이터스에 추가로 page: ? 로 페이지 넘김 가능)
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

app.post('/payments/cancel', async (req, res) => {
    
    try {
    const body = req.body;
    const Cimp_uid = body.Pimp_uid;
      //token 가져옴
      const accessToken = await _getIamportToken();

      //아임포트 환불 API 호출
      const refundRet = await axios({
        url : 'https://api.iamport.kr/payments/cancel',
        method : 'POST',
        headers : { "Authorization": accessToken },
        data : { 
          imp_uid : Cimp_uid, 
        }
      });
      const isSuccess = !!refundRet.data.response;
  
      if(isSuccess) {
        //환불완료
        res.redirect("/admin_login/admin_main");
      } else {

      }
  
    } catch(err) {

    }
  });

async function _getIamportToken() {
    const tokenParam = { imp_key : '7397847816519153', imp_secret : '4228312352ed2bfb2571bffdb1f21e17d6840b4913db97788a1f2064ae70520426996c9e2f3a1b07' };
  
    //accessToken 가져오기
    const tokenRes = await axios.post('https://api.iamport.kr/users/getToken', tokenParam),
          accessToken = tokenRes.data.response.access_token;
  
    if(!accessToken) {
      throw new Error("AccessToken is not exist");
    }
    return accessToken;
  }