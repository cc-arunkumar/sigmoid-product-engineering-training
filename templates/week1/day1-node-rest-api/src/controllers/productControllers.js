// import products from "../data/products.js";

// export const getAllProducts =  (req,res) => {

//     res.json(products);
// };

// export const getProductById = (req,res) => {
//     const productId = (req.params.id);
//     const product = products.find(p=> p.id == productId);
//     if(!product){
//         return res.status(404).json({message:"Product not found"});
//     }
//     res.json(product);

// };

// export const createProduct = (req,res) =>{
//     const {name,price,stock} = req.body;
//     const new1 = {
//         name,price,stock
//     };
//     products.push(new1);
//     res.status(201).json(new1);

// };

// export const modifyProduct = (req,res) =>{
//     const {id,name,price,stock} = req.body;
//     const product = products.find(p=> p.id == id);
//     if(!product){
//         return res.status(404).json({message:"Product not found"});
//     }
//     else{
//     product.name = name;
//     product.price = price;
//     product.stock = stock;
//     res.status(200).json(product);
//     }
// };

// export const deleteProduct = (req,res) =>{
//     const productId = req.params.id;
//     const product = products.find(p=> p.id == productId);
//     const index = products.findIndex(p=> p.id == productId);
//     if(!product){
//         return res.status(404).json({message:"Product not found"});
//     }
//     else{
//         const deleted = products.splice(index,1);
//         res.status(202).json({message:`Product with ${productId}`});
//     }
// }

// export const patchProduct = (req,res) =>{
//     const id = req.params.id;
//     const product = products.find(p=> p.id == id);
//     if(!product){
//         return res.status(404).json({message:"Product not found"});
//     }
//     else{
//         const {name,price,stock} = req.body;
//     if (name !== undefined) {
//     product.name = name;
//     }
//     if(price!==undefined)
//     product.price = price;
//     if(stock!=undefined)
//     product.stock = stock;
//     res.status(200).json(product);
//     }
// }

const { products } = require("../data/products");

const { successResponse } = require("../utils/apiResponse");


// GET all products

exports.getAllProducts = (req, res, next) => {

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

exports.modifyProduct = (req, res, next) => {

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


// PATCH

exports.patchProduct = (req, res, next) => {

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