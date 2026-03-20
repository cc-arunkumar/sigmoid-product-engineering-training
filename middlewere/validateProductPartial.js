const { errorResponse } = require("../utils/apiresponce");

const validatePatchProduct = (req, res, next) => {
    const { name, price, brand } = req.body;

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            return errorResponse(res, "Name must be a valid string", 400);
        }
    }

    if (price !== undefined) {
        if (typeof price !== "number" || price <= 0) {
            return errorResponse(res, "Price must be a number > 0", 400);
        }
    }

    if (brand !== undefined) {
        if (typeof brand !== "string" || brand.trim() === "") {
            return errorResponse(res, "Category must be a valid string", 400);
        }
    }

    next();
};

module.exports = validatePatchProduct;