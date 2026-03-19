const Product = require("../models/product.mongo");
const AppError = require("../utils/AppError");
const {successResponse} = require("../utils/apiResponse");

exports.createProductMongo = async(req,res,next)=>{
    try{
        const product =  await Product.craete(req.body);
        return successResponse(res,"Product saved in MongoDB",product);
    }catch(error){
        return next(new AppError(error.message,500));
    }
};