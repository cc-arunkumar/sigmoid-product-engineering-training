let orders = require("../data/orders");

// Get all orders
exports.getAllOrders = (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

// Get order by ID
exports.getOrderById = (req, res, next) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      const err = new Error("Order not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new order
exports.createOrder = (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      const err = new Error("userId, productId, and quantity are required");
      err.statusCode = 400;
      return next(err);
    }

    const newOrder = {
      id: orders.length ? orders[orders.length - 1].id + 1 : 1,
      userId,
      productId,
      quantity,
    };

    orders.push(newOrder);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

// Update order by ID
exports.updateOrder = (req, res, next) => {
  try {
    const orderId = parseInt(req.params.id);
    const { userId, productId, quantity } = req.body;

    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      const err = new Error("Order not found");
      err.statusCode = 404;
      return next(err);
    }

    if (userId) order.userId = userId;
    if (productId) order.productId = productId;
    if (quantity) order.quantity = quantity;

    res.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// Delete order by ID
exports.deleteOrder = (req, res, next) => {
  try {
    const orderId = parseInt(req.params.id);
    const orderIndex = orders.findIndex((o) => o.id === orderId);

    if (orderIndex === -1) {
      const err = new Error("Order not found");
      err.statusCode = 404;
      return next(err);
    }

    const deletedOrder = orders.splice(orderIndex, 1);

    res.json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder[0],
    });
  } catch (err) {
    next(err);
  }
};