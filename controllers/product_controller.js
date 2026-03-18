import { products } from "../data/product_data.js";
import { AppResponse } from "../utils/AppResponse.js";
import { AppError } from "../utils/AppError.js";

function getAllProducts(req,res,next){
    try {
        return new AppResponse({ data: products }).send(res);
    } catch (error) {
        return next(new AppError("Failed to fetch products", 500));
    }
}
function getProductById(req, res, next){
    try {
        const productId=parseInt(req.params.id)
        const product=products.find(p=>p.id===productId)
        if(!product) return next(new AppError("Product not found", 404));
        return new AppResponse({ data: product }).send(res);
    } catch (error) {
        return next(new AppError("Failed to fetch product", 500));
    }
}
function createProduct(req, res, next){
    try {
        const {name,price,category,stock}=req.body
        const newProduct={
            id: products.length+1,
            name:name,
            price:price,
            category:category,
            stock:stock
        }
        products.push(newProduct)
        return new AppResponse({
            statusCode: 201,
            data: newProduct,
            message: "Product created successfully"
        }).send(res);
    } catch (error) {
        return next(new AppError("Failed to create product", 500));
    }
}
function updateProduct(req, res, next){
    try {
        const productId=parseInt(req.params.id)
        const product=products.find(p=>p.id===productId)
        if(!product) return next(new AppError("Product not found", 404));
        const {name,price,category,stock}=req.body
        product.name=name
        product.price=price
        product.category=category
        product.stock=stock
        return new AppResponse({ data: product }).send(res);
    } catch (error) {
        return next(new AppError("Failed to update product", 500));
    }
}
function deleteProduct(req, res, next){
    try {
        const productId=parseInt(req.params.id)
        const product_index=products.findIndex(p=>p.id===productId)
        if(product_index===-1){
            return next(new AppError("Product not found", 404));
        }
        products.splice(product_index,1)
        return new AppResponse({ data: null, message: "Product deleted successfully" }).send(res);
    } catch (error) {
        return next(new AppError("Failed to delete product", 500));
    }
}
function partialUpdate(req,res,next){
    try {
        const productId=parseInt(req.params.id)
        const product=products.find(p=>p.id===productId)
        if(!product) return next(new AppError("Product not found", 404));
        const {name,price,category,stock}=req.body
        if(name) product.name=name
        if(price !== undefined) product.price=price
        if(category) product.category=category
        if(stock !== undefined) product.stock=stock
        return new AppResponse({ data: product }).send(res);
    } catch (error) {
        return next(new AppError("Failed to update product", 500));
    }
}
export {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,partialUpdate}
