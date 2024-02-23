const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'quipu-main.ctkukqackfc1.ap-northeast-2.rds.amazonaws.com',
    user: 'quipu0220',
    password: 'q0u2i2p0u!*',
    database: 'joinquipu'
});

connection.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 실패: ' + err.stack);
        return;
    }
    console.log('데이터베이스 연결 성공');
});