// server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 2395;

app.use(morgan('combined'));
// JSON 데이터를 파싱하기 위한 미들웨어 설정
app.use(express.json());
//CORS 정책 해결
app.use(cors({ 
    origin: ['https://quipu.uos.ac.kr', 'https://uos-quipu.vercel.app/'],
}));




const validname = /^[가-힣]+$/;
const validphoneNumber = /^\d{3}-\d{3,4}-\d{4}$/;
const validstudentNumber = /^\d{10}$/;

function isValidname(name) {
    return validname.test(name);
}
function isValidphoneNumber(phoneNumber) {
    return validphoneNumber.test(phoneNumber);
}
function isValidstudentNumber(studentNumber){
    return validstudentNumber.test(studentNumber);
}


// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'quipu-main.ctkukqackfc1.ap-northeast-2.rds.amazonaws.com',
    user: 'quipu0220',
    password: 'q0u2i2p0u!*',
    database: 'joinquipu',
    keepAlive: true
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

connection.on('error', (err) => {
   console.error('MySQL connection error:', err);
});



// POST 요청을 처리하는 라우트 설정
app.post('/api/data', async (req, res) => {
    try {
        const { membershipType, name, studentNumber, major, phoneNumber, textAreaContent } = req.body;
        console.log('데이터 전송 완료');
        console.log(req.body);
        if (!membershipType || !name || !studentNumber || !major || !phoneNumber) {
            // 값 누락 확인
            return res.status(400).json({ error: 'Bad request' });
        }
        if (!isValidname(name)) {
            return res.status(400).json({ error: 'Bad request' });
        }
        if (!isValidphoneNumber(phoneNumber)) {
            return res.status(400).json({ error: 'Bad request' });
        }
        if (!isValidstudentNumber(studentNumber)) {
            return res.status(400).json({ error: 'Bad request' });
        }
        let sql = 'select studentNumber from joinquipu where studentNumber=?'
        connection.query(sql, [studentNumber], function (err, rows) {
            let check = {};
            check.tf = rows[0] === undefined;
            if (check.tf === false){
                return res.status(409).json({ error: 'Conflict' });
            }
            else {
                const result = connection.execute(
                    'INSERT INTO joinquipu (membershipType, name, studentNumber, major, phoneNumber, textAreaContent) ' +
                    'VALUES (?, ?, ?, ?, ?, ?)',
                    [membershipType, name, studentNumber, major, phoneNumber, textAreaContent]
                );
                res.status(201).send();
                console.log('데이터 저장 완료');
            }
        })

    } catch (err) {
            console.error(err);
            res.status(500).send();
    }
});


// 서버 시작
app.listen(PORT, () => {
    console.log(`port number: ${PORT}`);
});

