const products = require("../data/product");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");

exports.getAllProducts = (req, res, next) => {
    try {
        successResponse(res, "Products retrieved successfully", products);
    } catch (error) {
        return next(new AppError(error.message || "Failed to retrieve products", 500));
    }
};

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

exports.createProduct = (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;
        const newProduct = {
            id: products[products.length - 1].id + 1,
            name,
            price,
            category,
            stock
        };
        products.push(newProduct);
        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};

exports.updateP = (req, res, next) => {
    try {
        const productID = req.params.id * 1;
        const index = products.findIndex(p => p.id === productID);
        if (index === -1) {
            return next(new AppError("Product not found", 404));
        }
        const { name, price, category, stock } = req.body;
        products[index] = { ...products[index], name, price, category, stock };
        return successResponse(res, "Product updated successfully", products[index]);
    } catch (error) {
        return next(new AppError(error.message || "Failed to update product", 500));
    }
};

exports.deleteProduct = (req, res, next) => {
    try {
        const productID = req.params.id * 1;
        const index = products.findIndex(p => p.id === productID);
        if (index === -1) {
            return next(new AppError("Product not found", 404));
        }
        const deletedProduct = products.splice(index, 1);
        return successResponse(res, "Product deleted successfully", deletedProduct[0]);
    } catch (error) {
        return next(new AppError(error.message || "Failed to delete product", 500));
    }
};

exports.patchProduct = (req, res, next) => {
    try {
        const productID = req.params.id * 1;
        const product = products.find(p => p.id === productID);
        if (!product) {
            return next(new AppError("Product not found", 404));
        }
        Object.assign(product, req.body);
        return successResponse(res, "Product patched successfully", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to patch product", 500));
    }
};
