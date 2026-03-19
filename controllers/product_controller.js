import { AppResponse } from "../utils/AppResponse.js";
import { AppError } from "../utils/AppError.js";
import Product from "../models/product.mongo.js";
async function getAllProducts(req,res,next){
    try {
        const products=await Product.find()
        return new AppResponse({ data: products }).send(res);
    } catch (error) {
        return next(new AppError("Failed to fetch products", 500));
    }
}
async function getProductById(req, res, next){
    try {
        const { id } = req.params;
        const product=await Product.findById(id)
        if(!product) return next(new AppError("Product not found", 404));
        return new AppResponse({ data: product }).send(res);
    } catch (error) {
        return next(new AppError("Failed to fetch product", 500));
    }
}
async function updateProduct(req, res, next){
    try {
        const { id } = req.params;
        const product=await Product.findByIdAndUpdate(id, req.body, { new: true , runValidators: true }    )
        if(!product) return next(new AppError("Product not found", 404));
        return new AppResponse({ data: product }).send(res);
    } catch (error) {
        return next(new AppError("Failed to update product", 500));
    }
}
async function deleteProduct(req, res, next){
    try {
        const { id } = req.params;
        const product=await Product.findByIdAndDelete(id)
        if(!product) return next(new AppError("Product not found", 404));
        return new AppResponse({ data: null, message: "Product deleted successfully" }).send(res);
    } catch (error) {
        return next(new AppError("Failed to delete product", 500));
    }
}
async function partialUpdate(req,res,next){
    try {
        const { id } = req.params;
        const product=await Product.findByIdAndUpdate(id, req.body, { new: true , runValidators: true }    )
        if(!product) return next(new AppError("Product not found", 404));
        return new AppResponse({ data: product }).send(res);
    } catch (error) {
        return next(new AppError("Failed to update product", 500));
    }
}
export {getAllProducts,getProductById,updateProduct,deleteProduct,partialUpdate}
