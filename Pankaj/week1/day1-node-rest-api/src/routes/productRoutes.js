const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");

// GET all products
router.get("/products", productController.getAllProducts);

// GET product by ID
router.get("/products/:id", productController.getProductById);

// CREATE product
router.post("/products", validateProduct, productController.createProduct);

// UPDATE product (PUT)
router.put("/products/:id", validateProduct, productController.updateProduct);

// DELETE product
router.delete("/products/:id", productController.deleteProduct);

// PATCH product
router.patch("/products/:id", validateProductPartial, productController.patchProduct);

module.exports = router;