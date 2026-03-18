const validateOrderPartial = (req, res, next) => {
    const { userId, productId, quantity, orderDate, status, totalPrice } = req.body;

    if (userId !== undefined) {
        if (typeof userId !== 'number' || userId <= 0) {
            return res.status(400).json({
                success: false,
                message: "userId must be a positive number"
            });
        }
    }

    if (productId !== undefined) {
        if (typeof productId !== 'number' || productId <= 0) {
            return res.status(400).json({
                success: false,
                message: "productId must be a positive number"
            });
        }
    }

    if (quantity !== undefined) {
        if (typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "quantity must be a positive number"
            });
        }
    }

    if (orderDate !== undefined) {
        if (typeof orderDate !== 'string') {
            return res.status(400).json({
                success: false,
                message: "orderDate must be a string (YYYY-MM-DD format)"
            });
        }
    }

    if (status !== undefined) {
        if (typeof status !== 'string' || !["pending", "shipped", "completed", "cancelled"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "status must be one of: pending, shipped, completed, or cancelled"
            });
        }
    }

    if (totalPrice !== undefined) {
        if (typeof totalPrice !== 'number' || totalPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "totalPrice must be a positive number"
            });
        }
    }

    next();
};

module.exports = validateOrderPartial;