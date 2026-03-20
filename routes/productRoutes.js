const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", authMiddleware, authorize("admin"), validateProduct, productController.createProduct);
router.put("/:id", authMiddleware, authorize("admin"), validateProduct, productController.updateProduct);
router.patch("/:id", authMiddleware, authorize("admin"), productController.patchProduct);
router.delete("/:id", authMiddleware, authorize("admin"), productController.deleteProduct);

module.exports = router;
