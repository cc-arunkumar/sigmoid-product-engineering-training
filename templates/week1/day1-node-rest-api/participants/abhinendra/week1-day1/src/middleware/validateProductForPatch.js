const validateProductForPatch = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    // Name validation (only if provided)
    if (name !== undefined) {
        if (name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Product name cannot be empty"
            });
        }
    }

    // Price validation
    if (price !== undefined) {
        if (price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0"
            });
        }
    }

    // Category validation
    if (category !== undefined) {
        if (category.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category cannot be empty"
            });
        }
    }

    // Stock validation
    if (stock !== undefined) {
        if (stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock cannot be negative"
            });
        }
    }

    next();
};

module.exports = validateProductForPatch;