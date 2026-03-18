const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");

// ✅ Correct import
const { protect, authorize } = require("../middleware/authMiddleware");

// GET all products (public)
router.get("/products", productController.getAllProducts);

// GET product by ID (public)
router.get("/products/:id", productController.getProductById);

// CREATE product (protected)
router.post(
  "/products",
  protect,
  authorize("user"),
  validateProduct,
  productController.createProduct
);

// UPDATE product
router.put(
  "/products/:id",
  protect,
  authorize("user"),
  validateProduct,
  productController.updateProduct
);

// DELETE product
router.delete(
  "/products/:id",
  protect,
  authorize("user"),
  productController.deleteProduct
);

// PATCH product
router.patch(
  "/products/:id",
  protect,
  authorize("user"),
  validateProductPartial,
  productController.patchProduct
);

module.exports = router;