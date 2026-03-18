const products = require("../data/products");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError");
const AppResponse=require("../utils/appResponse");

// GET all products
exports.getAllProducts = (req, res, next) => {
    try {
        return new AppResponse(res, "All products fetched", products);
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

        return new AppResponse(res, "Product by id fetched", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to fetch product", 500));
    }
};

// CREATE product
exports.createProduct = (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;

        const newProduct = {
            id: 100 + products.length + 1, // your logic kept
            name,
            price,
            category,
            stock
        };

        products.push(newProduct);

        return new AppResponse(res, "Added new product", newProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};

// UPDATE product (PUT)
exports.updateProduct = (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        const { name, price, category, stock } = req.body;

        product.name = name;
        product.price = price;
        product.category = category;
        product.stock = stock;

        return new AppResponse(res, "Product updated", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to update product", 500));
    }
};

// PATCH product
exports.updatePartialProduct = (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        const { name, price, category, stock } = req.body;

        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (category !== undefined) product.category = category;
        if (stock !== undefined) product.stock = stock;

        return new AppResponse(res, "Product partially updated", product);
    } catch (error) {
        return next(new AppError(error.message || "Failed to patch product", 500));
    }
};

// DELETE product
exports.deleteProduct = (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const index = products.findIndex(p => p.id === productId);

        if (index === -1) {
            return next(new AppError("Product not found", 404));
        }

        const deletedProduct = products.splice(index, 1);

        return new AppResponse(res, "Product deleted", deletedProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to delete product", 500));
    }
};