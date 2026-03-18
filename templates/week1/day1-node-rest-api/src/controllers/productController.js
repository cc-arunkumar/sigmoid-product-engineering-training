let products = require("../data/products");

const { successResponse } = require("../utils/apiResponse");

// GET all products
exports.getAllProducts = (req, res, next) => {
    try {
        return successResponse(res, "All products fetched successfully", products);
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
                message: "Product not found "
            });
        }

        return successResponse(res, "Product fetched successfully", product);
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

        const newproduct = {
            id: products.length + 101, // your logic preserved
            name,
            price,
            category,
            stock
        };

        products.push(newproduct);

        return successResponse(res, "Product created successfully", newproduct);
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
        const productId = req.params.id * 1;
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
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
        return next({
            statusCode: 500,
            message: error.message || "Failed to update product"
        });
    }
};


// PATCH (partial update)
exports.partialUpdateProduct = (req, res, next) => {
    try {
        const productId = req.params.id * 1;
        const product = products.find(p => p.id === productId);

        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }

        // dynamic update (better than manual if checks)
        Object.assign(product, req.body);

        return successResponse(res, "Product updated partially", product);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to patch product"
        });
    }
};


// DELETE product
exports.deleteProduct = (req, res, next) => {
    try {
        const productId = req.params.id * 1;
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }

        const deletedProduct = products.splice(productIndex, 1);

        return successResponse(res, "Product deleted successfully", deletedProduct);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to delete product"
        });
    }
};