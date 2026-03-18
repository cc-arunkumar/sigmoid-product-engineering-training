const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");

// GET all products
router.get("/api/products", productController.getAllProducts);

// GET product by ID
router.get("/api/products/:id", productController.getProductById);

// CREATE product
router.post("/api/products", validateProduct, productController.createProduct);

// UPDATE product (PUT)
router.put("/api/products/:id", validateProduct, productController.updateProduct);

// DELETE product
router.delete("/api/products/:id", productController.deleteProduct);

// PATCH product
router.patch("/api/products/:id", validateProductPartial, productController.patchProduct);

module.exports = router;