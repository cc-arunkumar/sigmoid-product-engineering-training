const { errorResponse } = require("../utils/apiResponse");

const validateProductPartial = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim().length === 0){
            errors.push("Product name must be a non-empty string");
        }
    }

    if (price !== undefined) {
        if (typeof price !== 'number' || price <= 0) {
            errors.push("Product price must be a positive number");
        }
    }

    if (category !== undefined) {
        if (typeof category !== 'string' || category.trim() === '') {
            errors.push("Product category must be a non-empty string");
        }
    }

    if (stock !== undefined) {
        if (typeof  stock !== 'number' || stock < 0) {
        errors.push("Product stock must be a non-negative number");
        }
    }

    next();
};

module.exports = validateProductPartial;