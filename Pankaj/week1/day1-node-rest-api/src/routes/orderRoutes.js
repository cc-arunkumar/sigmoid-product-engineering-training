const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderControllers");

// GET orders
router.get("/api/orders", orderController.getAllOrders);

// CREATE order
router.post("/api/orders", orderController.createOrder);

module.exports = router;