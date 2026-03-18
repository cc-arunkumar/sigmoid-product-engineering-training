const validatePartialProduct = (req, res, next) => {

    const { name, price, category, stock } = req.body;

    // Reject empty body (optional but recommended)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "No fields provided for update"
        });
    }

    // Name validation (only if provided)
    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Product name cannot be empty"
            });
        }
    }

    // Price validation (only if provided)
    if (price !== undefined) {
        if (typeof price !== "number" || price < 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be >= 0"
            });
        }
    }

    // Stock validation (only if provided)
    if (stock !== undefined) {
        if (typeof stock !== "number" || stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock can't be negative"
            });
        }
    }

    next();
};

module.exports = validatePartialProduct;