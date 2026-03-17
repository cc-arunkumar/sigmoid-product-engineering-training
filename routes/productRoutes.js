const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController")

router.get("/api/products", productController.getAllProducts);
router.get("/api/product/:id", productController.getProductById);
router.post("/api/products", productController.createProduct);
router.put("/api/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.patch("/products/:id", productController.updatePartialProduct);

module.exports = router;