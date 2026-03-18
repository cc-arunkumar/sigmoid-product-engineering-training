const products = require("../data/products");
const { successResponse } = require("../utils/apiResponse");

// GET all products
exports.getAllProducts = (req, res, next) => {
    try {
        return successResponse(res, "All products fetched", products);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to fetch products"
        });
    }
};

// GET product by ID
exports.getProductById = (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }

        return successResponse(res, "Product by id fetched", product);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to fetch product"
        });
    }
};

// CREATE product
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

        return successResponse(res, "Added new product", newProduct);
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
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }

        const { name, price, category, stock } = req.body;

        product.name = name;
        product.price = price;
        product.category = category;
        product.stock = stock;

        return successResponse(res, "Product updated", product);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to update product"
        });
    }
};

// DELETE product
exports.deleteProduct = (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const index = products.findIndex(p => p.id === productId);

        if (index === -1) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }

        deleted=products.splice(index, 1);

        return successResponse(res, "Product deleted", deleted);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to delete product"
        });
    }
};

// PATCH product
exports.updatePartialProduct = (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }

        const { name, price, category, stock } = req.body;

        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (category !== undefined) product.category = category;
        if (stock !== undefined) product.stock = stock;

        return successResponse(res, "Product partially updated", product);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to patch product"
        });
    }
};