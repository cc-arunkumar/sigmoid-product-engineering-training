const orders = require('../data/orders');
const { successResponse, errorResponse } = require('../utils/apiResponse');

function getAllOrders (req, res) {
    return successResponse(res, "Orders retrieved successfully", orders);
}

function getOrderById (req, res, next) {
    const id = parseInt(req.params.id);
    const order = orders.find(o => o.id === id);

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        return next(error);
    }

    return successResponse(res, "Order retrieved successfully", order);
}

function handleAddOrder (req, res, next) {
    const newOrder = req.body;
    if (!newOrder) {
        const error = new Error("Body required");
        error.statusCode = 400;
        return next(error);
    }
    orders.push(newOrder);
    return successResponse(res, "New order added", null, 201);
}

function handleDeleteOrderById (req, res, next) {
    const id = parseInt(req.params.id);
    const index = orders.findIndex(o => o.id === id);
    if(index === -1){
        const error = new Error("Order not found");
        error.statusCode = 404;
        return next(error);
    }
    orders.splice(index,1);
    return successResponse(res, "Deleted successfully", null);
}

function handleUpdateOrder (req, res, next) {
    const id = parseInt(req.params.id);
    const order = orders.find(o => o.id === id);
    
    if(!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        return next(error);
    }

    const { productId, quantity, totalPrice } = req.body;
    order.productId = productId;
    order.quantity = quantity;
    order.totalPrice = totalPrice;

    return successResponse(res, "Order updated successfully", order);
}

function handlePatchOrder (req, res, next) {
    const id = parseInt(req.params.id);
    const order = orders.find(o => o.id === id);
    
    if(!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        return next(error);
    }

    const { productId, quantity, totalPrice } = req.body;
    if(productId !== undefined) order.productId = productId;
    if(quantity !== undefined) order.quantity = quantity;
    if(totalPrice !== undefined) order.totalPrice = totalPrice;

    return successResponse(res, "Order patched successfully", order);
} 

module.exports = {
    getAllOrders,
    getOrderById,
    handleAddOrder,
    handleDeleteOrderById,
    handleUpdateOrder,
    handlePatchOrder
};