const orders = require("../data/orders");
const { successResponse } = require("../utils/apiResponse");

// GET all orders
exports.getAllOrders = (req, res, next) => {
  try {
    return successResponse(res, "Orders fetched", orders);
  } catch (err) {
    next({ statusCode: 500, message: err.message });
  }
};

// CREATE order
exports.createOrder = (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    const newOrder = {
      id: orders.length + 1,
      userId,
      productId,
      quantity
    };

    orders.push(newOrder);

    return successResponse(res, "Order created", newOrder);
  } catch (err) {
    next({ statusCode: 500, message: err.message });
  }
};