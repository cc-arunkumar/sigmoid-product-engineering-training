// config/db/mongo.js
const mongoose = require("mongoose");
require('dotenv').config()
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from DB");
    });
    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err.message);
    });
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
module.exports = connectMongo; // Create Sequelize instanceconst sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,
