const mongoose = require("mongoose");
const connect = async () => {
    try {

        console.log("hello world")
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully !!");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connect;