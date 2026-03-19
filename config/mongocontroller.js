const Product = require("../models/product.mongo");
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/apiResponse");

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return successResponse(res, "Products fetched", products);
    } catch (error) {
        return next(new AppError(error.message || "Failed to fetch products", 500));
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(new AppError("Product not found", 404));
        return successResponse(res, "Product fetched", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to fetch product", 500));
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return successResponse(res, "Product created", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return next(new AppError("Product not found", 404));
        return successResponse(res, "Product updated", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to update product", 500));
    }
};

exports.patchProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return next(new AppError("Product not found", 404));
        return successResponse(res, "Product patched", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to patch product", 500));
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return next(new AppError("Product not found", 404));
        return successResponse(res, "Product deleted", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to delete product", 500));
    }
};
