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

        return successResponse(res, "Product created successfully", newProduct, 201);
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

// PATCH product
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

// DELETE product
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

// const products = require("../data/products");

// exports.getAllProducts = (req, res) => {
//     res.json(products);
// };

// exports.getProductById = (req, res) => {
//     const productId = parseInt(req.params.id);
//     const product = products.find(p => p.id === productId);

//     if (!product) {
//         return res.status(400).json({
//             message: "Product not found"
//         })
//     }
//     res.json(product);
// }

// exports.createProduct = (req, res) => {
//     const { name, price, category, stock } = req.body;

//     const newProduct = {
//         id: products.length + 1,
//         name: name,
//         price: price,
//         category: category,
//         stock: stock
//     }

//     products.push(newProduct);
//     res.status(201).json(newProduct);
// }

// exports.modifyProduct = (req, res) => {
//     const productId = parseInt(req.params.id);
//     const { name, price, category, stock } = req.body;

//     const product = products.find(p => p.id === productId)

//     if (!product) {
//         return res.status(404).json({
//             message: "Product Id not found"
//         })
//     }

//     product.name = name;
//     product.price = price;
//     product.category = category;
//     product.stock = stock;

//     res.status(200).json(product);
// }

// exports.deleteProduct = (req, res) => {
//     const productId = parseInt(req.params.id);
//     const productIndex = products.findIndex(p => p.id === productId);

//     if (productIndex === -1) {
//         return res.status(404).json({
//             message: "Product Id not found"
//         })
//     }

//     products.splice(productIndex, 1);

//     res.status(200).json({
//         message: "Product Deleted"
//     });
// }