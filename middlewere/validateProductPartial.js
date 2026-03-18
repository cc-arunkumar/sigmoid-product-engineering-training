const validatePatchProduct = (req, res, next) => {

    const { name,price , brand} = req.body;
    const errors = [];

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            errors.push("Name must be a valid string");
        }
    }

    if (price !== undefined) {
        if (typeof price !== "number" || price <= 0) {
            errors.push("Price must be a number > 0");
        }
    }

    if (brand !== undefined) {
        if (typeof brand !== "string" || brand.trim() === "") {
            errors.push("Category must be a valid string");
        }
    }
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }
    next();
};

module.exports = validatePatchProduct;