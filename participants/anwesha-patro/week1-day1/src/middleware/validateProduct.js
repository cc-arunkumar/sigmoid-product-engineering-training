const validateProduct = (req, res, next) => {
    const { name, price, category, stock } = req.body;
    const method = req.method;

    if (method === "POST") {
        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (price === undefined || typeof price !== "number" || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0"
            });
        }

        if (!category || category.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category is required"
            });
        }

        if (stock === undefined || typeof stock !== "number" || stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock must be 0 or more"
            });
        }
    }

    if (method === "PATCH") {
        if (name !== undefined && name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name cannot be empty"
            });
        }

        if (price !== undefined) {
            if (typeof price !== "number" || price <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Price must be greater than 0 and number"
                });
            }
        }

        if (category !== undefined && category.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category cannot be empty"
            });
        }

        if (stock !== undefined) {
            if (typeof stock !== "number" || stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Stock cannot be negative or text"
                });
            }
        }
    }

    next();
};

module.exports = validateProduct;