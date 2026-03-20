const { Sequelize } = require("sequelize");

// Create Sequelize instance

const sequelize = new Sequelize(
    process.env.SQL_DB,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT || 3306, 
        dialect: "mysql",
        logging: false
    }
);

// Test connection

const connectSQL = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully");
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectSQL };