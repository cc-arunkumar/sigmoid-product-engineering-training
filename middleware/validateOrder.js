// Middleware function to validate the order data
// const validateOrder=(req,res,next)=>{
//     const {productId,quantity}=req.body;
//     if (!productId || productId.trim() === "") {
//         return res.status(400).json({status: false,message:"Product ID is required"});
//     }
//     if (!quantity || quantity.trim() === "") {
//         return res.status(400).json({status: false,message:"Quantity is required"});
//     }
//     next();
// }

// module.exports=validateOrder;

const { errorResponse } = require("../util/apiResponse");

const validateOrder = (req, res, next) => {
    const { productId, quantity } = req.body;
    
    if (productId === undefined || typeof productId !== "number" || productId <= 0) {
        return errorResponse(res, "Product ID must be a positive number", 400);
    }
    if (quantity === undefined || typeof quantity !== "number" || quantity <= 0) {
        return errorResponse(res, "Quantity must be a positive number", 400);
    }
    next();
}

module.exports = validateOrder;