const Product= require("../models/product.mongo");
const AppError=require("../utils/appError");
const {successResponse}=require("../utils/apiResponse");
exports.createProductMongo=async(req,res,next)=>{
    try{
        const {name,price,category}=req.body;
        return successResponse(res,"Product saved in mongodb",product);
    
    }catch(error){
        return next(new AppError(error.message,500));
    }
};