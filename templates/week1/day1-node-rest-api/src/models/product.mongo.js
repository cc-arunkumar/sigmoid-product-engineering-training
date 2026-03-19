import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:String,
    stock:{
        type:Number
    }
} , {timestamps:true}
);

export default mongoose.model("Product",productSchema);