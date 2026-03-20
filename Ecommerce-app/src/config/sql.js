const sequelize = require('sequelize');
require('dotenv').config();

//create sequelize instance
const sequelizeI = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    }
);

const connectSQL = async () => {
    try {
        await sequelizeI.authenticate();
        console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    }
}

module.exports = {sequelizeI, connectSQL};