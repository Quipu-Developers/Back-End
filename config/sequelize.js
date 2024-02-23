const { Sequelize } = require('sequelize');
const config = require('../config/config');

// 환경에 맞는 데이터베이스 연결 정보 가져오기
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

// 연결 테스트
sequelize.authenticate()
    .then(() => {
        console.log(dbConfig.host)
        console.log(dbConfig.database)
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
