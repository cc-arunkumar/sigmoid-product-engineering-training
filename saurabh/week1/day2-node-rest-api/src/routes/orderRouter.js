const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");
const validateOrder = require("../middleware/validateOrder");
const validateOrderPartial = require("../middleware/validateOrderPartial");

router.get("/api/orders", orderController.getAllOrders);
router.get("/api/orders/:id", orderController.getOrderById);
router.post("/api/orders", validateOrder, orderController.createOrder);
router.put("/api/orders/:id", validateOrder, orderController.updateOrder);
router.delete("/api/orders/:id", orderController.deleteOrder);
router.patch("/api/orders/:id", validateOrderPartial, orderController.patchOrder);

module.exports = router;