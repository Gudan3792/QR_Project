var mysql = require('mySQL');
var db_info = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '111111', /*mySQL 설치시 설정한 비밀번호*/
    database : 'project_sql' /* DB의 스키마 명칭 */
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql loaded!');
        });
    }
}