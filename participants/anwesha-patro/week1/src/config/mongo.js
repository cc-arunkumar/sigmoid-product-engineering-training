const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully");
    }
    catch (error) {
        console.error("failed to Connect", error);
        process.exit(1);

    }
}

module.exports = connectMongo