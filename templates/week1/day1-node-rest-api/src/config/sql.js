
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false
  }
);

// Connect & sync tables
const connectSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully");

    // This line will create all tables defined in your models if they don't exist
    await sequelize.sync();
    console.log("All tables synced");
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectSQL };