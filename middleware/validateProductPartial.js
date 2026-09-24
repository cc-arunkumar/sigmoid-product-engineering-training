const { errorResponse } = require("../utils/apiResponse");

const validatePatchProduct = (req, res, next) => {
const { name, stock, price, category } = req.body;
const errors = [];
if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
        errors.push("Name must be a valid string")
    }
}
if (stock !== undefined) {
    if (typeof stock !== "number" || stock < 0) {
        errors.push("Stock must be a number >= 0");
    }
}
if (price !== undefined) {
    if (typeof price !== "number" || price <= 0) {
        errors.push("Price must be a number > 0");
    }
}
if (category !== undefined) {
    if (typeof category !== "string" || category.trim() === "") {
        errors.push("Category must be a valid string");
    }
}
if (errors.length > 0) {
    return errorResponse(res, errors, 400);
}

next();
};

module.exports = validatePatchProduct