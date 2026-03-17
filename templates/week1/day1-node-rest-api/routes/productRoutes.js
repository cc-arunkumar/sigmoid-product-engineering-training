const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");

// product routes
router.get("/api/products", productController.getAllProducts);

router.get("/api/product/:id", productController.getProductById);

router.post("/api/product",
    validateProduct,
    productController.createProduct);

router.put("/api/product/:id", 
    validateProduct,
    productController.updateProduct);

router.delete("/api/product/:id", 
    validateProduct,
    productController.deleteProduct);

module.exports = router;