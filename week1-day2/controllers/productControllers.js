let products = require("../data/products");
const { successResponse } = require("../utils/apiResponse");

exports.getAll = (req, res) => {
    return successResponse(res, "Products fetched successfully", products);
};

exports.getProduct = (req, res, next) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    return successResponse(res, "Product fetched successfully", product);
};

exports.addProduct = (req, res) => {
    const { name, price, category, stock } = req.body;

    const newProduct = {
        id: products.length + 101,
        name,
        price,
        category,
        stock
    };

    products.push(newProduct);

    return successResponse(res, "Product created successfully", newProduct, 201);
};

exports.updateProduct = (req, res, next) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    const { name, price, category, stock } = req.body;

    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;

    return successResponse(res, "Product updated successfully", product);
};

exports.partialUpdateProduct = (req, res, next) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    Object.keys(req.body).forEach(key => {
        product[key] = req.body[key];
    });

    return successResponse(res, "Product partially updated", product);
};

exports.deleteProduct = (req, res, next) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    products = products.filter(p => p.id !== productId);

    return successResponse(
        res,
        `Product with id ${productId} deleted successfully`,
        null
    );
};