const validateOrder = (req, res, next) => {
    const { userId, productId, quantity, orderDate, status, totalPrice } = req.body;

    if (userId === undefined || userId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Valid userId is required"
        })
    }

    if (productId === undefined || productId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Valid productId is required"
        })
    }

    if (quantity === undefined || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Valid quantity is required (must be greater than 0)"
        })
    }

    if (!orderDate || typeof orderDate !== 'string') {
        return res.status(400).json({
            success: false,
            message: "Valid orderDate is required (YYYY-MM-DD format)"
        })
    }

    if (!status || !["pending", "shipped", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Valid status is required (pending, shipped, completed, or cancelled)"
        })
    }

    if (totalPrice === undefined || totalPrice <= 0) {
        return res.status(400).json({
            success: false,
            message: "Valid totalPrice is required (must be greater than 0)"
        })
    }

    next();
}

module.exports = validateOrder;