const mongoose = require("mongoose");
const connectMongo = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });
        console.log("MongoDB connected successfully !!");


        // Connection events
        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to DB");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected from DB");
        });
        mongoose.connection.on("error", (err) => {
            console.error("Mongoose connection error:", err.message);
        });

        // return true;
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectMongo;