// const validateProductForPatch = (req, res, next) => {
//     const { name, price, category, stock } = req.body;

//     // Name validation (only if provided)
//     if (name !== undefined) {
//         if (name.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Product name cannot be empty"
//             });
//         }
//     }

//     // Price validation
//     if (price !== undefined) {
//         if (price <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Price must be greater than 0"
//             });
//         }
//     }

//     // Category validation
//     if (category !== undefined) {
//         if (category.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Category cannot be empty"
//             });
//         }
//     }

//     // Stock validation
//     if (stock !== undefined) {
//         if (stock < 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Stock cannot be negative"
//             });
//         }
//     }

//     next();
// };

// module.exports = validateProductForPatch;



const { errorResponse } = require("../utils/apiResponse");

const validateProductForPatch = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    // NAME (only if provided)
    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            return errorResponse(res, "Product name must be a non-empty string", 400);
        }
    }

    // PRICE
    if (price !== undefined) {
        if (typeof price !== "number" || isNaN(price) || price <= 0) {
            return errorResponse(res, "Price must be a number greater than 0", 400);
        }
    }

    // CATEGORY
    if (category !== undefined) {
        if (typeof category !== "string" || category.trim() === "") {
            return errorResponse(res, "Category must be a non-empty string", 400);
        }
    }

    // STOCK
    if (stock !== undefined) {
        if (typeof stock !== "number" || isNaN(stock) || stock < 0) {
            return errorResponse(res, "Stock must be a non-negative number", 400);
        }
    }

    next();
};

module.exports = validateProductForPatch;