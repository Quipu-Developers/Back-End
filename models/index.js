const Sequelize = require('sequelize');
const General_member = require('./general_member');
const Dev_member = require('./dev_member');

const config = require(__dirname + '/../config/config.json')['test'];
const db = {};

const sequelize = new Sequelize (config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.General_member = General_member;
db.Dev_member = Dev_member;

General_member.initiate(sequelize);
Dev_member.initiate(sequelize);

module.exports = db;