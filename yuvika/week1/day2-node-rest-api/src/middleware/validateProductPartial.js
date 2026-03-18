const validateProductPartial = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '' || name.trim().length > 50) {
            return res.status(400).json({
                success: false,
                message: "Product name must be a non-empty string with a maximum length of 50 characters"
            });
        }
    }

    if (price !== undefined) {
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Product price must be a positive number"
            });
        }
    }

    if (category !== undefined) {
        if (typeof category !== 'string' || category.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Product category must be a non-empty string"
            });
        }
    }

    if (stock !== undefined) {
        if (typeof  stock !== 'number' || stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Product stock must be a non-negative number"
            });
        }
    }

    next();
};

module.exports = validateProductPartial;