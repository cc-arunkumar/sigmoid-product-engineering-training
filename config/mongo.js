const mongoose=require("mongoose");

const connectMongo=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        mongoose.connection.on("connected",()=>{
            console.log("MongoDB connected successfully !!");
        });
        mongoose.connection.on("disconnected",()=>{
            console.log("Mongoose disconnected from DB");
        });
        mongoose.connection.on("error",(err)=>{
            console.error("Mongoose connection error:", err.message);
        });
    }catch(error){
        console.log("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports=connectMongo;



// const mongoose=require("mongoose");

// const connectMongo=async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("MongoDB connected successfully !!");
//     }catch(error){
//         console.log("MongoDB Connection Failed:", error);
//         process.exit(1);
//     }
// };

// module.exports=connectMongo;