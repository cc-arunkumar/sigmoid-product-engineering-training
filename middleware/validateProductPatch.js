const validateProductPatch = (req, res, next) => {
    const { name, stock, price, category } = req.body;

    const errors = [];

    // NAME
    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            errors.push("Name must be a valid string");
        }
    }

    // STOCK
    if (stock !== undefined) {
        if (typeof stock !== "number" || stock < 0) {
            errors.push("Stock must be a number >= 0");
        }
    }

    // PRICE
    if (price !== undefined) {
        if (typeof price !== "number" || price <= 0) {
            errors.push("Price must be a number > 0");
        }
    }

    // CATEGORY
    if (category !== undefined) {
        if (typeof category !== "string" || category.trim() === "") {
            errors.push("Category must be a valid string");
        }
    }

    // CHECK ERRORS
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors,
        });
    }

    next();
};

module.exports = validateProductPatch;