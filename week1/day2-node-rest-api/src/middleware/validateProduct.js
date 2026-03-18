const { errorResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");


const validateProduct = (req,res,next) =>{
    const {name, price, category, stock}= req.body;


    //NAME
    if(typeof name !== "string" || name.trim().length === 0){
        return errorResponse(res, "Product name must be a string", 400);
    }
    
    //PRICE
    if(typeof price !== "number" || isNaN(price) || price <= 0){
        return errorResponse(res, "Price must be greater than 0", 400);
    }
    
    //CATEGORY
    if(typeof category !== "string" || category.trim() === ""){
        return errorResponse(res, "Product category is required", 400);
        
    }

    //stock
    if(typeof stock !== "number" || isNaN(stock) || stock < 0){
        return errorResponse(res, "Stock must be a non-negative number", 400);
        }
    next();
};
module.exports=validateProduct;