const products = require("../data/products");

const { successResponse } = require("../utils/apiResponse");

const appError = require("../utils/appError");

// GET all products

exports.getAllProducts = (req, res, next) => {

    try {
            let time= new Date();
        return successResponse(res, `All products fetched successfully at ${time}`, products);

    } catch (error) {

        return next(new AppError(error.message || "Failed to fetch products", 500));

    }

};


// GET product by ID

exports.getProductById = (req, res, next) => {

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

// CREATE product (POST)

exports.createProduct = (req, res, next) => {

    try {

        const { name, price, category, stock } = req.body;


        const newProduct = {

            id: products.length + 100 + 1,

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


// UPDATE product (PUT)

exports.updateProduct = (req, res, next) => {

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


// PATCH

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

exports.deleteProductById = (req, res, next) => {

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