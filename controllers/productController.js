// const e = require("express");
// const products=require ("../data/products")

// exports.getProducts=(req,res)=>{
//     res.json(products);
// };

// exports.getProductById=(req,res,next)=>{
//     const pId=parseInt(req.params.id);
//     const product=products.find(p=>p.id===pId);
//     if(!product){
//         const error=new Error("Product not found");
//         error.statusCode=404;
//         return next(error);
//     }
//     res.send(product);
// };

// exports.createProduct=(req,res)=>{
//     const {name,price,category,stocks}=req.body;
//     const newProduct={
//         id:products.length+1,
//         name:name,
//         price:price,
//         category:category,
//         stocks:stocks
//     };
//     products.push(newProduct);
//     res.status(201).json(newProduct);
// };


// exports.updateProduct=(req,res,next)=>{
//     const pId=req.params.id*1;
//     const product=products.find(p=>p.id===pId);
//     if(!product){
//         const error=new Error("Product not found");
//         error.statusCode=404;
//         return next(error);
//     }
//     const {name,price,category,stocks}=req.body;
//     product.name=name || product.name;
//     product.price=price || product.price;
//     product.category=category || product.category;
//     product.stocks=stocks || product.stocks;

//     res.json(product);
// };
// exports.deleteProduct=(req,res,next)=>{
//     const pId=req.params.id*1;
//     const productIndex=products.findIndex(p=>p.id===pId);
//     if(productIndex===-1){
//         const error=new Error("Product not found");
//         error.statusCode=404;
//         return next(error);
//     }
//     products.splice(productIndex,1);
//     res.json({message:"Product deleted successfully"});
// }

// exports.updatePartialProduct=(req,res,next)=>{
//     const pId=req.params.id*1;
//     const product=products.find(p=>p.id===pId);
//     if(!product){
//         const error=new Error("Product not found");
//         error.statusCode=404;
//         return next(error);
//     }
//     const {name,price,category,stocks}=req.body;
//     if(name != undefined) product.name=name;
//     if(price != undefined) product.price=price;
//     if(category != undefined) product.category=category;
//     if(stocks != undefined) product.stocks=stocks;

//     res.status(200).json(product);
// };

const products = require("../data/products");

const { successResponse } = require("../util/apiResponse");


// GET all products

exports.getProducts = (req, res, next) => {

try {

return successResponse(res, "All products fetched successfully", products);

} catch (error) {

return next({

statusCode: 500,

message: error.message || "Failed to fetch products"

});

}

};


// GET product by ID

exports.getProductById = (req, res, next) => {

try {

const productId = (req.params.id) * 1;

const product = products.find(p => p.id === productId);


if (!product) {

return next({

statusCode: 404,

message: "Product not found"

});

}


return successResponse(res, "Product fetched successfully", product);

} catch (error) {

return next({

statusCode: 500,

message: error.message || "Failed to fetch product"

});

}

};

// CREATE product (POST)

exports.createProduct = (req, res, next) => {

try {

const { name, price, category, stock } = req.body;


const newProduct = {

id: products.length + 1,

name,

price,

category,

stock

};


products.push(newProduct);


return successResponse(res, "Product created successfully", newProduct);

} catch (error) {

return next({

statusCode: 500,

message: error.message || "Failed to create product"

});

}

};


// UPDATE product (PUT)

exports.updateProduct = (req, res, next) => {

try {

const productId = (req.params.id) * 1;

const index = products.findIndex(p => p.id === productId);


if (index === -1) {

return next({

statusCode: 404,

message: "Product not found"

});

}


const { name, price, category, stock } = req.body;


products[index] = {

id: productId,

name,

price,

category,

stock

};


return successResponse(res, "Product updated successfully", products[index]);

} catch (error) {

return next({

statusCode: 500,

message: error.message || "Failed to update product"

});

}

};


// PATCH product (partial update)

exports.updatePartialProduct = (req, res, next) => {

try {

const productId = (req.params.id) * 1;

const product = products.find(p => p.id === productId);


if (!product) {

return next({

statusCode: 404,

message: "Product not found"

});

}


Object.assign(product, req.body);


return successResponse(res, "Product updated partially", product);

} catch (error) {

return next({

statusCode: 500,

message: error.message || "Failed to patch product"

});

}

};


// DELETE

exports.deleteProduct = (req, res, next) => {

try {

const productId = (req.params.id) * 1;

const index = products.findIndex(p => p.id === productId);


if (index === -1) {

return next({

statusCode: 404,

message: "Product not found"

});

}


const deleted = products.splice(index, 1);


return successResponse(res, "Product deleted successfully", deleted);

} catch (error) {

return next({

statusCode: 500,

message: error.message || "Failed to delete product"

});

}

};