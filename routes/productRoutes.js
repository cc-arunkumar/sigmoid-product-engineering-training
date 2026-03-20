const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");
const validate = require("../middleware/validateProduct");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);

router.post("/", validate, protect, authorize("admin"), controller.createProduct);

router.put("/:id", validate, protect, authorize("admin"), controller.updateProduct);

router.delete("/:id", protect, authorize("admin"), controller.deleteProduct);

module.exports = router;