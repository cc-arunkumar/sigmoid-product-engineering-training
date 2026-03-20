require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_DB_NAME, 'root', process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
