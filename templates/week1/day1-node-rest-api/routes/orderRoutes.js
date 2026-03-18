const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/api/orders", orderController.getAllOrders);
router.get("/api/order/:id", orderController.getOrderById);
router.post("/api/order", orderController.createOrder);
router.put("/api/order/:id", orderController.updateOrder);
router.delete("/api/order/:id", orderController.deleteOrder);

module.exports = router;