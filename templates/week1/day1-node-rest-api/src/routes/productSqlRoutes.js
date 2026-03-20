const express = require("express");
const router = express.Router();
const productSQLController = require("../controllers/productSqlController"); // Sequelize controller
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

// Get all products
router.get(
  "/api/v1/sql/products",
  protect,
  cache(60000),
  productSQLController.getAllProducts
);

// Get product by ID
router.get(
  "/api/v1/sql/product/:id",
  protect,
  cache(60000),
  productSQLController.getProductById
);

// Create a product (user role)
router.post(
  "/api/v1/sql/products",
  protect,
  authorize("user"),
  productSQLController.createProduct
);

// Update product completely (user role)
router.put(
  "/api/v1/sql/product/:id",
  protect,
  authorize("user"),
  productSQLController.updateProduct
);

// Partial update (admin role)
router.patch(
  "/api/v1/sql/product/:id",
  protect,
  authorize("admin"),
  productSQLController.updateProductPartially
);

// Delete product (admin role)
router.delete(
  "/api/v1/sql/product/:id",
  protect,
  authorize("admin"),
  productSQLController.deleteProduct
);

module.exports = router;