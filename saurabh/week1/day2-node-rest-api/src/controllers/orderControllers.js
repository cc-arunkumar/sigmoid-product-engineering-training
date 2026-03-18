const orders = require("../data/order");

exports.getAllOrders = (req, res) => {
    res.json(orders);
}

exports.getOrderById = (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        })
    }
    res.json(order);
}

exports.createOrder = (req, res) => {
    const { userId, productId, quantity, orderDate, status, totalPrice } = req.body;

    const newOrder = {
        id: orders[orders.length - 1].id + 1,
        userId: userId,
        productId: productId,
        quantity: quantity,
        orderDate: orderDate,
        status: status,
        totalPrice: totalPrice
    }
    console.log("Newly created Order = ", newOrder)
    orders.push(newOrder);
    res.status(201).json({
        status: 201,
        message: "Order created successfully",
        order: newOrder
    })
}

exports.updateOrder = (req, res) => {
    const orderId = req.params.id * 1;
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        })
    }
    const { userId, productId, quantity, orderDate, status, totalPrice } = req.body;

    order.userId = userId;
    order.productId = productId;
    order.quantity = quantity;
    order.orderDate = orderDate;
    order.status = status;
    order.totalPrice = totalPrice;

    res.status(200).json(order);
}

exports.deleteOrder = (req, res) => {
    const orderId = req.params.id * 1;
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        return res.status(404).json({
            message: "Order not found"
        })
    }
    orders.splice(orderIndex, 1);
    res.json({
        message: "Order deleted successfully"
    });
}

exports.patchOrder = (req, res) => {
    const orderId = req.params.id * 1;
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        })
    }
    const { userId, productId, quantity, orderDate, status, totalPrice } = req.body;
    if (userId !== undefined) {
        order.userId = userId;
    }
    if (productId !== undefined) {
        order.productId = productId;
    }
    if (quantity !== undefined) {
        order.quantity = quantity;
    }
    if (orderDate !== undefined) {
        order.orderDate = orderDate;
    }
    if (status !== undefined) {
        order.status = status;
    }
    if (totalPrice !== undefined) {
        order.totalPrice = totalPrice;
    }
    res.status(200).json(order)
}