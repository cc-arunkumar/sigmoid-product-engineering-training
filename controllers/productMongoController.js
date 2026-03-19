import Product from "../models/product.mongo.js";
import { AppResponse } from "../utils/AppResponse.js";
import { AppError } from "../utils/AppError.js";
const createProductMongo=async (req,res,next)=>{
    try {
        const product=await Product.create(req.body)
        return new AppResponse({
            statusCode: 201,
            data: product,
            message: "Product created successfully"
        }).send(res);
    } catch (error) {
        return next(new AppError("Failed to create product", 500));
    }
}
export {createProductMongo}