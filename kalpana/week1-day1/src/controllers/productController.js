const productService = require("../services/productService");
const AppError = require("../utils/appError");
const { successResponse } = require("../utils/apiResponse");

// -------------------- GET ALL PRODUCTS --------------------
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        // Ensure response shows both DBs clearly
        const response = {
            mongo: products.mongo || [],
            sql: products.sql || [],
        };
        return successResponse(res, "All products fetched successfully", response);
    } catch (err) {
        return next(new AppError(err.message || "Failed to fetch products", 500));
    }
};

// -------------------- GET PRODUCT BY ID --------------------
exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product || (!product.mongo && !product.sql)) {
            return next(new AppError("Product not found", 404));
        }
        const response = {
            mongo: product.mongo || null,
            sql: product.sql || null,
        };
        return successResponse(res, "Product fetched successfully", response);
    } catch (err) {
        return next(new AppError(err.message || "Failed to fetch product", 500));
    }
};

// -------------------- CREATE PRODUCT (POST) --------------------
exports.createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        const response = {
            mongo: product.mongo || null,
            sql: product.sql || null,
        };
        return successResponse(res, "Product created successfully", response, 201);
    } catch (err) {
        return next(new AppError(err.message || "Failed to create product", 500));
    }
};

// -------------------- UPDATE PRODUCT (PUT) --------------------
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product || (!product.mongo && !product.sql)) {
            return next(new AppError("Product not found", 404));
        }
        const response = {
            mongo: product.mongo || null,
            sql: product.sql || null,
        };
        return successResponse(res, "Product updated successfully", response);
    } catch (err) {
        return next(new AppError(err.message || "Failed to update product", 500));
    }
};

// -------------------- PATCH PRODUCT --------------------
exports.patchProduct = async (req, res, next) => {
    try {
        const product = await productService.patchProduct(req.params.id, req.body);
        if (!product || (!product.mongo && !product.sql)) {
            return next(new AppError("Product not found", 404));
        }
        const response = {
            mongo: product.mongo || null,
            sql: product.sql || null,
        };
        return successResponse(res, "Product updated partially", response);
    } catch (err) {
        return next(new AppError(err.message || "Failed to patch product", 500));
    }
};

// -------------------- DELETE PRODUCT --------------------
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product || (!product.mongo && !product.sql)) {
            return next(new AppError("Product not found", 404));
        }
        const response = {
            mongo: product.mongo || null,
            sql: product.sql || null,
        };
        return successResponse(res, "Product deleted successfully", response);
    } catch (err) {
        return next(new AppError(err.message || "Failed to delete product", 500));
    }
};