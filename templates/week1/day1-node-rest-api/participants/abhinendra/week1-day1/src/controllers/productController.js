// let products = require ("../data/products");

// const { successResponse, errorResponse } = require("../utils/apiResponse");

// exports.getAllProducts= (req, res)=>{
//     // res.json(products);
//     return successResponse(res, "Products fetched successfully", products);
// };

// exports.getProductByID= (req,res)=>{
//     const productID= parseInt(req.params.id);

//     const  product = products.find( p => p.id=== productID);

//     if(!product){
//         // return res.status(404).json({
//         //     message : "Product not Found"
//         // });
//         return errorResponse(res, "Product not Found", 404);
//     }
//         // res.json(product);
//         return successResponse(res, "Product fetched successfully", product);
// };

// exports.createProduct= (req, res)=>{
//     const {name,price,category,stock}= req.body;

//     const newProduct={
//         id: 100+products.length+1,
//         name:name,
//         price:price,
//         category:category,
//         stock:stock
//     }

//     products.push(newProduct);

//     // res.status(201).json(products);
//     return successResponse(res, "Product created successfully", newProduct, 201);
// }

// exports.updateProduct= (req, res)=>{
//     const productID = parseInt(req.params.id);

//     const product= products.find(p => p.id === productID);

//     if(!product){
//         return res.status(404).json({
//             message: "Product not Found"
//         })
//     }

//     const {name,price,category,stock}= req.body;

//     product.name = name;
//     product.price= price;
//     product.category=category;
//     product.stock=stock;

//     // res.status(200).json(product);
//     return successResponse(res, "Product updated successfully", product);

// }

// exports.deleteProduct = (req, res) => {
//     const productID = Number(req.params.id);

//     const updatedProducts = products.filter(p => p.id !== productID);

//     if (updatedProducts.length === products.length) {
//         return res.status(404).json({
//             message: "Product not Found"
//         });
//     }

//     products = updatedProducts;

//     // res.status(200).json(products);
//     return successResponse(res, "Product deleted successfully", products);
// };


// exports.updatePartialProduct = (req, res)=>{

//     const productID = parseInt(req.params.id);

//     const product = products.find(p => p.id === productID);

//     if(!product){
//         return res.status(400).json({
//             message:"data not found"
//         })
//     }

//     const {name,price,category,stock}= req.body;

//     if(name!== undefined) product.name=name;
//     if(price!== undefined) product.price=price;
//     if(category!== undefined) product.category=category;
//     if(stock!== undefined) product.stock=stock;

//     // res.status(200).json(product);
//     return successResponse(res, "Product updated partially", product);
// }



























const products = require("../data/products");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// GET all products
exports.getAllProducts = (req, res, next) => {
    try {
        return successResponse(res, "Products fetched successfully", products);
    } catch (error) {
        // return next({
        //     statusCode: 500,
        //     message: error.message || "Failed to fetch products"
        // });
        return next(new AppError(error.message || "Failed to fetch products", 500));
    }
};

// GET product by ID
exports.getProductById = (req, res, next) => {
    try {
        const productId = Number(req.params.id);

        const product = products.find(p => p.id === productId);

        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }

        return successResponse(res, "Product fetched successfully", product);
    } catch (error) {
        // return next({
        //     statusCode: 500,
        //     message: error.message || "Failed to fetch product"
        // });
        return next(new AppError(error.message || "Failed to fetch product", 500));
    }
};

// CREATE product
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

        return successResponse(res, "Product created successfully", newProduct, 201);
    } catch (error) {
        // return next({
        //     statusCode: 500,
        //     message: error.message || "Failed to create product"
        // });
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};

// UPDATE product (PUT)
exports.updateProduct = (req, res, next) => {
    try {
        const productId = Number(req.params.id);

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
        // return next({
        //     statusCode: 500,
        //     message: error.message || "Failed to update product"
        // });

        return next(new AppError(error.message || "Failed to update product", 500));
    }
};

// PATCH product
exports.patchProduct = (req, res, next) => {
    try {
        const productId = Number(req.params.id);

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
        // return next({
        //     statusCode: 500,
        //     message: error.message || "Failed to patch product"
        // });
        return next(new AppError(error.message || "Failed to patch product", 500));
    }
};

// DELETE product
exports.deleteProduct = (req, res, next) => {
    try {
        const productId = Number(req.params.id);

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
        // return next({
        //     statusCode: 500,
        //     message: error.message || "Failed to delete product"
        // });
        return next(new AppError(error.message || "Failed to delete product", 500));
    }
};