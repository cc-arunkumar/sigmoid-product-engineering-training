const mongoose = require("mongoose");

const connectMongo = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully!!");
    }catch(error){
        console.error("MongoDB connection Failed", error);
        process.exit(1);
    }
};

module.exports = connectMongo;