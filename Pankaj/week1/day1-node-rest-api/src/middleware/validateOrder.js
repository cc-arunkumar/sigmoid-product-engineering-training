const validateOrder = (req, res, next) => {
    const { userId, productIds, total } = req.body;

    if (userId === undefined || userId <= 0) {
        return res.status(400).json({
            success: false,
            message: "User ID is required and should be a positive number"
        });
    }

    if (!Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Product IDs should be a non-empty array"
        });
    }

    if (total === undefined || total <= 0) {
        return res.status(400).json({
            success: false,
            message: "Total is required and should be a positive number"
        });
    }

    next();
};

module.exports = validateOrder;