import { Sequelize } from "sequelize";


const createDatabase = async () => {
  try {
    // Connect WITHOUT database
    const sequelize = new Sequelize(
      null,
      process.env.SQL_USER,
      process.env.SQL_PASSWORD || null,
      {
        host: process.env.SQL_HOST || "127.0.0.1",
        port: process.env.SQL_PORT || 3306,
        dialect: "mysql",
      }
    );

    await sequelize.authenticate();

    // Create DB if not exists
    await sequelize.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.SQL_DB}\`;`
    );

    console.log("Database created or already exists ");

    await sequelize.close();
  } catch (error) {
    console.error("DB creation failed ", error.message);
  }
};

export default createDatabase;