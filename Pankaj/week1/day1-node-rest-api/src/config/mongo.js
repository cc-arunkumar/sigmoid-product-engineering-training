const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI );
        console.log("MongoDB connected Successfully");

        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected in DB");
        });

        mongoose.connection.on("disconnected", ()=> {
            console.log("Mongoose disconnected from DB");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Mongoose connection error: ", err);  
        });
    }
    catch( error){
        console.error("MongoDB connection failed: ", error.message);
        process.exit(1);
    }
};
module.exports = connectDB;