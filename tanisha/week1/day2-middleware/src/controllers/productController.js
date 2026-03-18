const products = require("../data/product");
//const { successResponse } = require("../utils/apiResponse");
const AppError=require("../utils/AppError");
const AppResponse = require("../utils/AppResponse");
// GET all products
exports.getAllProducts = (req, res, next) => {
    try {

        return new AppResponse(res, products, "All products fetched successfully");

    } catch (error) {

        return next(new AppError(error.message || "Failed to fetch products", 500));

    }
};
// GET product by ID
exports.getProductsById = (req, res, next) => {

    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        if (!product) {

            return next(new AppError("Product not found", 404));

        }
        return new AppResponse(res, product, "Product fetched successfully");
    } catch (error) {
        return next(new AppError(error.message || "Failed to fetch product", 500));

    }
};
// CREATE product (POST)

exports.createProducts = (req, res, next) => {

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


        return new AppResponse(res, newProduct, "Product created successfully");

    } catch (error) {

        return next(new AppError(error.message || "Failed to create product", 500));

    }

};


// UPDATE product (PUT)

exports.updateProduct = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

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


        return new AppResponse(res, products[index], "Product updated successfully");

    } catch (error) {

        return next(new AppError(error.message || "Failed to update product", 500));

    }

};


// PATCH

exports.patchProduct = (req, res, next) => {


    try {

        const productId = parseInt(req.params.id);

        const product = products.find(p => p.id === productId);


        if (!product) {

            return next(new AppError("Product not found", 404));

        }


        Object.assign(product, req.body);


        return new AppResponse(res, product, "Product updated partially");

    } catch (error) {

        return next(new AppError(error.message || "Failed to patch product", 500));

    }

};


// DELETE

exports.deleteProduct = (req, res, next) => {

    try {

        const productId = parseInt(req.params.id);

        const index = products.findIndex(p => p.id === productId);


        if (index === -1) {

            return next(new AppError("Product not found", 404));

        }


        const deletedProduct = products.splice(index, 1);


        return new AppResponse(res, deletedProduct, "Product deleted successfully");

    } catch (error) {

        return next(new AppError(error.message || "Failed to delete product", 500));

    }

};
