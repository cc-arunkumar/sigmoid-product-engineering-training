const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePatchProduct = require("../middleware/validatePatchProduct");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.get("/", protect, productController.getAllProducts);
router.get("/:id", protect, productController.getProductById);
router.post("/", protect, validateProduct, productController.createProduct);
router.patch(
  "/:id",
  protect,
  validatePatchProduct,
  productController.patchProduct,
);
router.put("/:id", protect, validateProduct, productController.updateProduct);
router.delete(
  "/:id",
  protect,
  authorize("admin", "lead-guide"),
  productController.deleteProduct,
);

module.exports = router;
