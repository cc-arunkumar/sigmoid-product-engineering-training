const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");
const protect = require("../middleware/authMiddleware");

// GET all products
router.get("/products", productController.getAllProducts);

// GET product by ID
router.get("/products/:id", productController.getProductById);

// CREATE product
router.post("/products", protect, validateProduct, productController.createProduct);

// UPDATE product (PUT)
router.put("/products/:id", protect, validateProduct, productController.updateProduct);

// DELETE product
router.delete("/products/:id", protect, productController.deleteProduct);

// PATCH product
router.patch("/products/:id", protect, validateProductPartial, productController.patchProduct);

module.exports = router;