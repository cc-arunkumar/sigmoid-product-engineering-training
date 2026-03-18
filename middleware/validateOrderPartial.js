// Middleware function to validate the request body for updating an order
const validateOrderPartial = (req, res, next) =>{
    const { productId, quantity } = req.body;
    
    if (productId !== undefined && (typeof productId !== 'number' || productId <= 0)) {
        return res.status(400).json({ success: false, message: "Product ID must be a positive number" });
    }
    if (quantity !== undefined && (typeof quantity !== 'number' || quantity <= 0)) {
        return res.status(400).json({ success: false, message: "Quantity must be a positive number" });
    }
    next();

}

module.exports=validateOrderPartial;