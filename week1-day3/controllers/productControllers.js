// let products = require("../data/products");
// const { successResponse } = require("../utils/apiResponse");

// exports.getAll = (req, res) => {
//     return successResponse(res, "Products fetched successfully", products);
// };

// exports.getProduct = (req, res, next) => {
//     const productId = Number(req.params.id);
//     const product = products.find(p => p.id === productId);

//     if (!product) {
//         const error = new Error("Product not found");
//         error.statusCode = 404;
//         return next(error);
//     }

//     return successResponse(res, "Product fetched successfully", product);
// };

// exports.addProduct = (req, res) => {
//     const { name, price, category, stock } = req.body;

//     const newProduct = {
//         id: products.length + 101,
//         name,
//         price,
//         category,
//         stock
//     };

//     products.push(newProduct);

//     return successResponse(res, "Product created successfully", newProduct, 201);
// };

// exports.updateProduct = (req, res, next) => {
//     const productId = Number(req.params.id);
//     const product = products.find(p => p.id === productId);

//     if (!product) {
//         const error = new Error("Product not found");
//         error.statusCode = 404;
//         return next(error);
//     }

//     const { name, price, category, stock } = req.body;

//     product.name = name;
//     product.price = price;
//     product.category = category;
//     product.stock = stock;

//     return successResponse(res, "Product updated successfully", product);
// };

// exports.partialUpdateProduct = (req, res, next) => {
//     const productId = Number(req.params.id);
//     const product = products.find(p => p.id === productId);

//     if (!product) {
//         const error = new Error("Product not found");
//         error.statusCode = 404;
//         return next(error);
//     }

//     Object.keys(req.body).forEach(key => {
//         product[key] = req.body[key];
//     });

//     return successResponse(res, "Product partially updated", product);
// };

// exports.deleteProduct = (req, res, next) => {
//     const productId = Number(req.params.id);
//     const product = products.find(p => p.id === productId);

//     if (!product) {
//         const error = new Error("Product not found");
//         error.statusCode = 404;
//         return next(error);
//     }

//     products = products.filter(p => p.id !== productId);

//     return successResponse(
//         res,
//         `Product with id ${productId} deleted successfully`,
//         null
//     );
// };

// -------------------------------------------------------------------------------------------------- //

const products = require("../data/products");
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
        const productId = (req.params.id) * 1;
        const product = products.find(p => p.id === productId);

        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found"
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

// CREATE product (POST)
exports.createProduct = (req, res, next) => {
    try {

        const { name, price, category, stock } = req.body;

        const newProduct = {
            id: products.length + 1,
            name,
            price,
            category,
            stock
        };

        products.push(newProduct);
        return successResponse(res, "Product created successfully", newProduct);

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
        const productId = (req.params.id) * 1;
        const index = products.findIndex(p => p.id === productId);

        if (index === -1) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
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
        return next({
            statusCode: 500,
            message: error.message || "Failed to update product"
        });
    }
};

// PATCH
exports.patchProduct = (req, res, next) => {
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
exports.deleteProduct = (req, res, next) => {
    try {
        const productId = (req.params.id) * 1;
        const index = products.findIndex(p => p.id === productId);

        if (index === -1) {
            return next({
                statusCode: 404,
                message: "Product not found"
            });
        }
        const deleted = products.splice(index, 1);

        return successResponse(res, "Product deleted successfully", deleted);
    } catch (error) {
        return next({
            statusCode: 500,
            message: error.message || "Failed to delete product"
        });
    }
};