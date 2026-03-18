import { products } from "../data/product_data.js";
import { sucessResponse, errorResponse } from "../utils/apiResponse.js";
function getAllProducts(req,res){
    try {
        sucessResponse(res, products)
    } catch (error) {
        return next({
            status:500,
            message:"Failed to fetch products"
        })
    }
}
function getProductById(req, res){
    try {
        const productId=parseInt(req.params.id)
        const product=products.find(p=>p.id===productId)
        if(!product) return errorResponse(res, "Product not found", 404)
        else return sucessResponse(res, product)
    } catch (error) {
        return next({
            status:500,
            message:"Failed to fetch product"
        })
    }
}
function createProduct(req, res){
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
        sucessResponse(res, newProduct, "Product created successfully", 201)
    } catch (error) {
        return next({
            status:500,
            message:"Failed to create product"
        })
    }
}
function updateProduct(req, res){
    try {
        const productId=parseInt(req.params.id)
        const product=products.find(p=>p.id===productId)
        if(!product) return errorResponse(res, "Product not found", 404)
        const {name,price,category,stock}=req.body
        product.name=name
        product.price=price
        product.category=category
        product.stock=stock
        sucessResponse(res, product)
    } catch (error) {
        return next({
            status:500,
            message:"Failed to update product"
        })
    }
}
function deleteProduct(req, res){
    try {
        const productId=parseInt(req.params.id)
        const product_index=products.findIndex(p=>p.id===productId)
        if(product_index===-1){
            return errorResponse(res, "Product not found", 404)
        }
        products.splice(product_index,1)
        return sucessResponse(res, null, "Product deleted successfully")
    } catch (error) {
        return next({
            status:500,
            message:"Failed to delete product"
        })
    }
}
function partialUpdate(req,res){
    try {
        const productId=parseInt(req.params.id)
        const product=products.find(p=>p.id===productId)
        if(!product) return errorResponse(res, "Product not found", 404)
        const {name,price,category,stock}=req.body
        if(name) product.name=name
        if(price) product.price=price
        if(category) product.category=category
        if(stock) product.stock=stock
        return sucessResponse(res, product)
    } catch (error) {
        return next({
            status:500,
            message:"Failed to update product"
        })
    }
}
export {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,partialUpdate}