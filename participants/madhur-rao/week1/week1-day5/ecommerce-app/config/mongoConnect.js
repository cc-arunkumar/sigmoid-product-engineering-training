const mongoose = require("mongoose");
// require("dotenv").config();

const connectMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to MongoDB");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected from MongoDB");
        });
        mongoose.connection.on("error", (err) => {
            console.log("Mongoose connection error:",err.message);
        });
    } catch(error){
        console.error("MongoDB connection failed: ", error.message);
        process.exit(1);
    }
};
module.exports = connectMongo;