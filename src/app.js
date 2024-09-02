const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');


const { sequelize } = require('./models');
const uploadRouter = require('./routes/upload.js');
const upload2Router = require('./routes/upload2.js');
const eventRouter = require('./routes/event.js');

// Swagger 관련 추가
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
    app.use(express.urlencoded({ extended: false }));
} else{
    app.enable('trust proxy');
    app.use(morgan("combined"));
    app.use(helmet({contentSecurityPolicy: false}));
    app.use(hpp());
    app.use(express.urlencoded({ extended: true }));
}

//CORS 정책 해결
app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트의 Origin
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true, // 쿠키를 포함한 요청을 허용}));
}));
//DB 연결
sequelize.authenticate()
    .then(() => {
        console.log('DB 연결');
        return sequelize.sync();

    })
    .then(() => {
        console.log('DB 동기화');
        // 주기적으로 DB 연결 상태 유지
        setInterval(() => {
            sequelize.query('SELECT 1')
                .then(() => {
                    console.log('SELECT 1 query executed successfully');
                })
                .catch(err => {
                    console.error('Error executing SELECT 1 query:', err);
                });
        }, 3600000); // 1시간(밀리초 단위)
        app.listen(PORT, () => {
            console.log(`port:${PORT}`)
            console.log(`swagger: http://localhost:${PORT}/api-docs`);
            console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
        });
    })
    .catch(err => {
        console.error('DB 연결 실패:', err);
    });

//router 처리
app.use('/data1', uploadRouter);
app.use('/data2', upload2Router);
app.use('/event', eventRouter);
//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//error 처리
app.use((err, req, res, next) => {
    console.log(err);
});



