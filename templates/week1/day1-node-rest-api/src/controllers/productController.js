let products = require("../data/products");

const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");


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
        const productId = req.params.id * 1;
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
exports.createProduct = (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;

        const newproduct = {
            id: products.length + 101, // your original logic preserved
            name,
            price,
            category,
            stock
        };

        products.push(newproduct);

        return successResponse(res, "Product created successfully", newproduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};


// UPDATE product (PUT)
exports.updateProduct = (req, res, next) => {
    try {
        const productId = req.params.id * 1;
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return next(new AppError("Product not found", 404));
        }

        const { name, price, category, stock } = req.body;

        products[productIndex] = {
            id: productId,
            name,
            price,
            category,
            stock
        };

        return successResponse(res, "Product updated successfully", products[productIndex]);
    } catch (error) {
        return next(new AppError(error.message || "Failed to update product", 500));
    }
};


// PATCH (partial update)
exports.partialUpdateProduct = (req, res, next) => {
    try {
        const productId = req.params.id * 1;
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
exports.deleteProduct = (req, res, next) => {
    try {
        const productId = req.params.id * 1;
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return next(new AppError("Product not found", 404));
        }

        const deletedProduct = products.splice(productIndex, 1);

        return successResponse(res, "Product deleted successfully", deletedProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to delete product", 500));
    }
};