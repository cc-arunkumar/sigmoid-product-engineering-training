const { errorResponse } = require("../utils/apiResponse");

const validatePatchProduct = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    const errors = [];

    // NAME
    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            errors.push("Product name must be a valid non-empty string");
        }
    }

    // PRICE
    if (price !== undefined) {
        if (typeof price !== "number" || price <= 0) {
            errors.push("Price must be a number greater than 0");
        }
    }

    // CATEGORY
    if (category !== undefined) {
        if (typeof category !== "string" || category.trim() === "") {
            errors.push("Category must be a valid non-empty string");
        }
    }

    // STOCK
    if (stock !== undefined) {
        if (typeof stock !== "number" || stock < 0) {
            errors.push("Stock must be a number greater than or equal to 0");
        }
    }

    // FINAL ERROR RESPONSE
    if (errors.length > 0) {
        return errorResponse(res, errors, 400);
    }

    next();
};

module.exports = validatePatchProduct;