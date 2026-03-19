import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    dialect: "mysql",
    logging: false, // optional
  }
);

export const connectSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected ");
  } catch (error) {
    console.error("MySQL connection failed ", error.message);
  }
};

