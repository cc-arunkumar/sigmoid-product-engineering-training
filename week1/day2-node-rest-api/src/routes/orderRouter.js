const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");
const validateOrder = require("../middleware/validateOrder");
const validateOrderPartial = require("../middleware/validateOrderPartial");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.get("/api/orders", protect, authorize("user", "admin"), orderController.getAllOrders);
router.get("/api/orders/:id", protect, authorize("user", "admin"), orderController.getOrderById);
router.post("/api/orders", protect, authorize("admin"), validateOrder, orderController.createOrder);
router.put("/api/orders/:id", protect, authorize("admin"), validateOrder, orderController.updateOrder);
router.delete("/api/orders/:id", protect, authorize("admin"), orderController.deleteOrder);
router.patch("/api/orders/:id", protect, authorize("admin"), validateOrderPartial, orderController.patchOrder);

module.exports = router;