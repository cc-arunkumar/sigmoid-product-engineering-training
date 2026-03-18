
const products = require("../data/product");

const { successResponse } = require("../utils/apiResponse");


// GET all products

exports.getAllProducts = (req, res, next) => {

    try {

        return successResponse(res, products, "All products fetched successfully");

    } catch (error) {

        return next({

            statusCode: 500,

            message: error.message || "Failed to fetch products"

        });

    }

};


// GET product by ID

exports.getProductsById = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

        const product = products.find(p => p.id === productId);


        if (!product) {

            return next({

                statusCode: 404,

                message: "Product not found"

            });

        }


        return successResponse(res, product, "Product fetched successfully");

    } catch (error) {

        return next({

            statusCode: 500,

            message: error.message || "Failed to fetch product"

        });

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


        return successResponse(res, newProduct, "Product created successfully");

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


        return successResponse(res, products[index], "Product updated successfully");

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


        return successResponse(res, product, "Product updated partially");

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


        return successResponse(res, deleted, "Product deleted successfully");

    } catch (error) {

        return next({

            statusCode: 500,

            message: error.message || "Failed to delete product"

        });

    }

};
