const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");
const validateOrder = require("../middleware/validateOrder");
const validateOrderPartial = require("../middleware/validateOrderPartial");
const errorHandler = require("../middleware/errorHandler");

router.get("/api/orders", errorHandler, orderController.getAllOrders);
router.get("/api/orders/:id", errorHandler, orderController.getOrderById);
router.post("/api/orders", validateOrder, orderController.createOrder);
router.put("/api/orders/:id", validateOrder, orderController.updateOrder);
router.delete("/api/orders/:id", errorHandler, orderController.deleteOrder);
router.patch("/api/orders/:id", validateOrderPartial, orderController.patchOrder);

module.exports = router;