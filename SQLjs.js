var mysql = require('mySQL');
var db_info = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '111111',
    database : 'project_sql'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}
/* conn.connect();
conn.query('SELECT * FROM menu ', function(error, res, fields){
    if(error){
        console.log(error);
    }
    console.log(res);
});

conn.end(); */

//일단 터미널에 node SQLjs.js 후 로딩되는거 확인