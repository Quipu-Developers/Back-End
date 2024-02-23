const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const React = require('react');
dotenv.config();
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 7770);
app.set('view engine', 'html');

nunjucks.configure('../quipu-main-frontend/src', {
    express: app,
    watch: true,
});


sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 동기화 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev')); // 배포할 때는 'combined'로 수정, 로깅 관련된 미들웨어
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// 404 not found
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, 'view/error.html'));
    //res.sendFile('/view/error');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
