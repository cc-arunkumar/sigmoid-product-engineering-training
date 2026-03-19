const mongoose=require("mongoose");
const { MONGO_URI } = process.env;



const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("connected to MongoDB");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports=connectDB;
