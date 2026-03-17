exports.validateProduct = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    const isPartial = req.method === "PATCH";

    if (!isPartial || name !== undefined) {
        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: isPartial ? "Product name cannot be empty" : "Product name is required"
            });
        }
    }

    if (!isPartial || price !== undefined) {
        if (price === undefined || typeof price !== "number" || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0"
            });
        }
    }

    if (!isPartial || category !== undefined) {
        if (!category || typeof category !== "string" || category.trim() === "") {
            return res.status(400).json({
                success: false,
                message: isPartial ? "Category cannot be empty" : "Category is required"
            });
        }
    }

    if (!isPartial || stock !== undefined) {
        if (stock === undefined || typeof stock !== "number" || stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock cannot be negative"
            });
        }
    }

    next();
};