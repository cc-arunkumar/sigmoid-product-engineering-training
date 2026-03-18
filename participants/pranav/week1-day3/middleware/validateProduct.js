const validateProduct = (req, res, next) => {

    const { name, price, category, stock } = req.body;

    // NAME
    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product name must be a non-empty string"
        });
    }

    // PRICE
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be a number greater than 0"
        });
    }

    // CATEGORY
    if (typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category must be a non-empty string"
        });
    }

    // STOCK
    if (typeof stock !== "number" || isNaN(stock) || stock < 0) {
        return res.status(400).json({
            success: false,
            message: "Stock must be a non-negative number"
        });
    }

    next();
};

module.exports = validateProduct;