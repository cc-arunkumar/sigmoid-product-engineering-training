const validatePartialProduct = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    // Name validation
    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product name is required!"
        });
    }

    // Price validation
    if (price === undefined || price < 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be greater than or equal to 0"
        });
    }

    // Stock validation
    if (stock === undefined || stock < 0) {
        return res.status(400).json({
            success: false,
            message: "Stock can't be negative"
        });
    }

    next();
};

module.exports = validatePartialProduct;