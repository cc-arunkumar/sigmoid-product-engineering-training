import { AppError } from "../utils/AppError.js";
const validateProductPatch=(req,res,next)=>{
    const {name,price,category,stock}=req.body
    if(name!==undefined){
        if(typeof name !== "string" || name.trim() === ""){
            return next(new AppError("Name must be a non-empty string", 400));
      }
    }
    if(price !== undefined){
        if(typeof price !== "number" || price <= 0){
            return next(new AppError("Price must be a positive number", 400));
        }
    }
    if(category !== undefined){
        if(typeof category !== "string" || category.trim() === ""){
            return next(new AppError("Category must be a non-empty string", 400));
        }
    }
    if(stock !== undefined){
        if(typeof stock !== "number" ||  stock < 0){
            return next(new AppError("Stock cannot be negative", 400));
        }
    }
    next();
}
export default validateProductPatch; 
