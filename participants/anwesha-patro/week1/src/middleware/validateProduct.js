const { errorResponse } = require("../utils/apiResponse");

const validateProduct = (req, res, next) => {
    const { name, price, category, stock } = req.body;
    const method = req.method;

    const errors = [];

    //  POST & PUT → All fields required
    if (method === "POST" || method === "PUT") {

        // NAME
        if (typeof name !== "string" || name.trim() === "") {
            errors.push("Product name must be a non-empty string");
        }

        // PRICE
        if (typeof price !== "number" || isNaN(price) || price <= 0) {
            errors.push("Price must be a number greater than 0");
        }

        // CATEGORY
        if (typeof category !== "string" || category.trim() === "") {
            errors.push("Category must be a non-empty string");
        }

        // STOCK
        if (typeof stock !== "number" || isNaN(stock) || stock < 0) {
            errors.push("Stock must be a non-negative number");
        }
    }

    // PATCH → Only validate provided fields
    if (method === "PATCH") {

        if (name !== undefined) {
            if (typeof name !== "string" || name.trim() === "") {
                errors.push("Name must be a valid string");
            }
        }

        if (price !== undefined) {
            if (typeof price !== "number" || isNaN(price) || price <= 0) {
                errors.push("Price must be a number > 0");
            }
        }

        if (category !== undefined) {
            if (typeof category !== "string" || category.trim() === "") {
                errors.push("Category must be a valid string");
            }
        }

        if (stock !== undefined) {
            if (typeof stock !== "number" || isNaN(stock) || stock < 0) {
                errors.push("Stock must be a number >= 0");
            }
        }
    }

    //  Send errors if any
    if (errors.length > 0) {
        return errorResponse(res, errors.join(", "), 400);
    }

    next();
};

module.exports = validateProduct;