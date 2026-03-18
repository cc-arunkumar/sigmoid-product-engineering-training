import { AppError } from "../utils/AppError.js";

const validateProduct = (req, res, next) => {
    const { name, price, category, stock } = req.body;
    if(typeof name !== "string" || name.trim() === ""){
        return next(new AppError("Product name is required", 400));
    };
    if(typeof price !== "number" || price <= 0){
        return next(new AppError("Price must be a positive number", 400));
    };
    if(typeof category !== "string" || category.trim() === ""){
        return next(new AppError("Category is required", 400));
    };
    if(typeof stock !== "number" || stock < 0){
        return next(new AppError("Stock cannot be negative", 400));
    };
    next()
}
export default validateProduct;
