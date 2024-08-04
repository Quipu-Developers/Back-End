const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');

const { sequelize } = require('./models');
const uploadRouter = require('./routes/upload.js');
const upload2Router = require('./routes/upload2.js');

// Swagger 관련 추가
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//morgan
app.use(morgan('combined'));
app.use(morgan('dev'));
// JSON 데이터를 파싱하기 위한 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
//CORS 정책 해결
app.use(cors({ origin: 'http://localhost:3000' }));

//DB 연결
sequelize.authenticate()
    .then(() => {
        console.log('DB 연결');
        return sequelize.sync({});
        //return sequelize.sync({ });
    })
    .then(() => {
        console.log('DB 동기화');
        app.listen(PORT, () => {
            console.log(`port:${PORT}`)
            console.log(`swagger: http://localhost:${PORT}/api-docs`);
            console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
        });
    })
    .catch(err => {
        console.error('DB 연결 실패:', err);
    });
//cors 정책 해결
app.options((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://quipu.uos.ac.kr');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
    next();
});

// POST 요청을 처리 by upload route
app.use('/data1', uploadRouter);
app.use('/data2', upload2Router);
//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//error 처리
app.use((err, req, res, next) => {
    console.log(err);
});



