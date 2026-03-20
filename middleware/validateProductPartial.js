const { errorResponse } = require("../utils/apiResponse");

const validatePatchProduct = (req, res, next) => {
    const { name, stock, price, category } = req.body;
    const errors = [];

    // 1. Optional Name Validation
    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            errors.push("Name must be a valid string");
        }
    }

    // 2. Optional Stock Validation
    if (stock !== undefined) {
        if (typeof stock !== "number" || stock < 0) {
            errors.push("Stock must be a number >= 0");
        }
    }

    // 3. Optional Price Validation
    if (price !== undefined) {
        if (typeof price !== "number" || price <= 0) {
            errors.push("Price must be a number > 0");
        }
    }

    // 4. Optional Category Validation
    if (category !== undefined) {
        if (typeof category !== "string" || category.trim() === "") {
            errors.push("Category must be a valid string");
        }
    }

    // If any errors were collected, return them all at once
    if (errors.length > 0) {
        return errorResponse(res, errors, 400);
    }

    // All checks passed, move to the controller
    next();
};

module.exports = validatePatchProduct;