const AppError = require("../utils/appError");

const validateProduct = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    if (typeof name !== "string" || name.trim() === "") {
        return next(new AppError("Product name must be a non-empty string", 400));
    }

    if (typeof price !== "number" || isNaN(price) || price <= 0) {
        return next(new AppError("Price must be a number greater than 0", 400));
    }

    if (typeof category !== "string" || category.trim() === "") {
        return next(new AppError("Category must be a non-empty string", 400));
    }

    if (typeof stock !== "number" || isNaN(stock) || stock < 0) {
        return next(new AppError("Stock must be a non-negative number", 400));
    }

    next();
};

module.exports = validateProduct;