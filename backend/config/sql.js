const { Sequelize } = require("sequelize");
require("dotenv").config();

/**
 * Initialize Sequelize Instance
 * We use the individual variables from .env to build the connection
 */
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name
    process.env.DB_USER,      // Username
    process.env.DB_PASSWORD,  // Password
    {
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false,       // Set to console.log to see raw SQL queries
    }
);

/**
 * Helper function to test and establish the connection
 */
const connectSQL = async () => {
    try {
        await sequelize.authenticate();
        console.log(" MySQL connected successfully via Sequelize");
    } catch (error) {
        console.error(" MySQL connection failed:", error.message);
        // It's often better to throw the error or handle it in app.js 
        // than to kill the process here, but this works for simple apps.
        process.exit(1); 
    }
};

module.exports = { sequelize, connectSQL };