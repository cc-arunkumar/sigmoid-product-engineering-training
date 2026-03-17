const validateProduct = (req, res, next) => {
    const { name, category,price, stock } = req.body;

    if (!name || name.trim() === "" || name.length <= 0) {
        return res.status(400).json({
            success: false,
            message: "product name is required"
        });
    }

     if (!category || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    if (price <= 0 || price === undefined) {
        return res.status(400).json({
            success: false,
            message: "price must be greater than 0"
        })
    }
    if (stock === undefined || stock < 0) {
        return res.status(400).json({
            success: false,
            message: "Stock cannot be negative"
        });
    }
    next();
}

module.exports = validateProduct ;