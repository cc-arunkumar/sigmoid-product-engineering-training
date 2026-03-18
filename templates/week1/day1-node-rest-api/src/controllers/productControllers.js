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

import products from "../data/products.js"
import { successResponse } from "../utils/apiResponse.js";
import AppError from "../utils/appError.js";


// GET all products

export const getAllProducts = (req, res, next) => {

try {

return successResponse(res, "All products fetched successfully", products);

} catch (error) {

return next(new AppError(error.message || "Failed to fetch products", 500));

}

};


// GET product by ID

export const getProductById = (req, res, next) => {

try {

const productId = parseInt(req.params.id);

const product = products.find(p => p.id === productId);


if (!product) {

return next(new AppError("Product not found", 404));

}


return successResponse(res, "Product fetched successfully", product);

} catch (error) {

return next(new AppError(error.message || "Failed to fetch product", 500));

}

};


// CREATE product

export const createProduct = (req, res, next) => {



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

return next(new AppError(error.message || "Failed to create product", 500));

}

};


// UPDATE product (PUT - full update)

export const modifyProduct = (req, res, next) => {

try {

const productId = parseInt(req.params.id);

const index = products.findIndex(p => p.id === productId);


if (index === -1) {

return next(new AppError("Product not found", 404));

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

return next(new AppError(error.message || "Failed to update product", 500));

}

};


// PATCH product (partial update)

export const patchProduct = (req, res, next) => {

try {

const productId = parseInt(req.params.id);

const product = products.find(p => p.id === productId);


if (!product) {

return next(new AppError("Product not found", 404));

}


Object.assign(product, req.body);


return successResponse(res, "Product updated partially", product);

} catch (error) {

return next(new AppError(error.message || "Failed to patch product", 500));

}

};


// DELETE product

export const deleteProduct = (req, res, next) => {

try {

const productId = parseInt(req.params.id);

const index = products.findIndex(p => p.id === productId);


if (index === -1) {

return next(new AppError("Product not found", 404));

}


const deletedProduct = products.splice(index, 1);


return successResponse(res, "Product deleted successfully", deletedProduct);

} catch (error) {

return next(new AppError(error.message || "Failed to delete product", 500));

}

};