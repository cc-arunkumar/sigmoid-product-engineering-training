// const products = require("../data/product");
// const successResponse= require("../utils/apiResponse")

// exports.getAllProducts=(req, res)=>{
//     successResponse(res, products, "Product fetched");
// }

// exports.getProductById= (req, res, next)=>{
//     const productId= parseInt(req.params.id);
//     const product= products.find(p=>p.id===productId);
//     if(!product){
//         const error= new Error("product not found");
//         error.statusCode=404;
//         next(error);
        
//     }
//      successResponse(res, product, "Product fetched");
    
// }



// exports.createProduct = (req,res)=>{
    
//     const{name, price, category,stock}=req.body;

//     const newP={
//         id: products[products.length-1].id+1,
//         name: name,
//         price: price,
//         category: category,
//         stock: stock
//     }
//     console.log("Newly created Product = ",newP)
//     products.push(newP);
//     successResponse(res, newP, "Product fetched",201);
// }

// exports.updateP= (req,res,next)=>{
//     const productID= req.params.id*1;
//     const product= products.find(p=>p.id===productID);
//     if(!product){
//         const error= new Error("product not found");
//         error.statusCode= 404;
//         next(error);
//     }
//     const{name, price, category,stock}=req.body;

//     product.name= name;
//     product.price= price;
//     product.category= category;
//     product.stock= stock;

//      successResponse(res, product, "Product fetched");
// }
// exports.deleteP =(req,res)=>{
//     const productID= req.params.id*1;
//     const product= products.findIndex(p=>p.id===productID);
//     if(product===-1){
//         const error= new Error("product not found");
//         error.statusCode= 404;
//         next(error);
//     }
//     products.splice(product,1);
//     successResponse(res, null, "Product DELETED",204);
// }

// exports.patchP= (req,res)=>{
//     const productID= req.params.id*1;
//     const product= products.find(p=>p.id===productID);
//     if(!product){
//         const error= new Error("product not found");
//         error.statusCode= 404;
//         next(error);
//     }
//     const{name, price, category,stock}=req.body;
//     if(name!=undefined){
//         product.name= name;
//     }
//     if(price!=undefined){
//         product.price= price;
//     }
//     if(category!=undefined){
//         product.category= category;
//     }
//     if(stock!= undefined){
//         product.stock= stock;
//     }
//      successResponse(res, product, "product updated");

// }

const products = require("../data/product");

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

exports.updateP = (req, res, next) => {

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

exports.patchP = (req, res, next) => {

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

exports.deleteP= (req, res, next) => {

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


return successResponse(res, "Product deleted successfully");

} catch (error) {

return next({

statusCode: 500,

message: error.message || "Failed to delete product"

});

}

}
