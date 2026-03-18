const products = require("../data/products");

const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");


// GET all products

exports.getAllProducts = (req, res, next) => {

    try {

        return successResponse(res, "All products fetched successfully", products);

    } catch (error) {

        return next(new AppError(error.message || "Failed to fetch products", 500));

    }

};


// GET product by ID

exports.getProductById = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

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

            id: 100 + products.length + 1,

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


        return successResponse(res, "Product updated successfully", products[index]);

    } catch (error) {

        return next(new AppError(error.message || "Failed to update product", 500));

    }

};


// PATCH

exports.patchProduct = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

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


// DELETE

exports.deleteProduct = (req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

        const index = products.findIndex(p => p.id === productId);


        if (index === -1) {

            return next(new AppError("Product not found", 404));

        }


        const deleted = products.splice(index, 1);


        return successResponse(res, "Product deleted successfully", deleted);

    } catch (error) {

        return next(new AppError(error.message || "Failed to delete product", 500));

    }

};

// Alias so route (productController.updatePartialProduct) resolves correctly
exports.updatePartialProduct = exports.patchProduct;