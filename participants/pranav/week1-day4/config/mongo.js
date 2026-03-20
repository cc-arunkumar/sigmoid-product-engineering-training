const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    console.log(process.env.DATABASE_URL);
    
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected successfully !!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectMongo;