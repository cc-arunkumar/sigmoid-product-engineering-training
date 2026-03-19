const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");
const Product = require("../models/product.mongo"); // your Mongoose model

// GET all products
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return successResponse(res, "All products fetched successfully", products);
    } catch (error) {
        return next(new AppError(error.message || "Failed to fetch products", 500));
    }
};

// GET product by ID
exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product fetched successfully", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to fetch product", 500));
    }
};

// CREATE product (POST)
exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        return successResponse(res, "Product created successfully", newProduct, 201);
    } catch (error) {
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};

// UPDATE product (PUT)
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product updated successfully", updatedProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to update product", 500));
    }
};

// PATCH product
exports.updatePartialProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const patchedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patchedProduct) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product updated partially", patchedProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to patch product", 500));
    }
};

// DELETE product
exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product deleted successfully", deletedProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to delete product", 500));
    }
};