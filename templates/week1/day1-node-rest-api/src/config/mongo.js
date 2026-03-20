import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb"
    );

    console.log("MongoDB connected ");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectMongo;