let products = require("../Data/products");
const {successResponse} = require("../utils/apiResponse");

function getAllProducts(req,res){
    return successResponse(res, "Products fetched successfully", products);
}

function getProductById(req,res,next){
    const productId=parseInt(req.params.id);
    console.log(req.params);
    const product=products.find(p => p.id === productId);
    
    if(!product){
        const error = new Error("wrong ID");
        error.statusCode = 404;
        return next(error);
    }
    return successResponse(res, "Product fetched successfully", product);
}

function createProduct(req,res){
    const {name,price,category,stock}=req.body;
    const product = {
        id:products.length + 1,
        name:name,
        price:price,
        category:category,
        stock:stock
    };
    products.push(product);
    return successResponse(res, "Product created successfully", product, 201);
}

function updateProduct(req,res,next){
    const productId=parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if(!product){
       const error = new Error("Wrong ID");
       error.statusCode = 404;
       return next(error);
    }
    const {name,price, category, stock} = req.body;
    product.name=name;
    product.price=price;
    product.category=category;
    product.stock = stock;

    return successResponse(res, "Product updated successfully", product);
}

function deleteProduct(req,res,next){
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        const error = new Error("Wrong ID");
        error.statusCode = 404;
        return next(error);
    }

    const remainingProducts = products.filter(p => p.id!=productId);
    products = remainingProducts;

    return successResponse(res, "Deleted successfully", null);
}

function updatePartialProduct(req,res,next){
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        const error = new Error("Wrong ID");
        error.statusCode = 404;
        return next(error);
    }

    const {name,price,category,stock} = req.body;
    if(name !== undefined) product.name=name;
    if(price !== undefined) product.price = price;
    if(category !== undefined) product.category = category;
    if(stock !== undefined) product.stock = stock;

    return successResponse(res, "Product partially updated", product);
}

module.exports = {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,updatePartialProduct};