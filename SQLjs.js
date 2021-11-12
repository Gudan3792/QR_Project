var mySQL = require('mySQL');
var conn = mySQL.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '111111',
    database : 'project_sql'
});

conn.connect();
conn.query('SELECT * FROM menu', function(error, res, fields){
    if(error){
        console.log(error);
    }
    console.log(res);
});

conn.end();

//일단 터미널에 node SQLjs.js 후 로딩되는거 확인