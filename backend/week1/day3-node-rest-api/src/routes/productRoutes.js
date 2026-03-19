const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePatchProduct = require("../middleware/validatePatchProduct");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

router.get("/", cache(6000), productController.getAllProducts);
router.get("/:id", cache(6000), productController.getProductById);
router.post("/", validateProduct, productController.createProduct);
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
