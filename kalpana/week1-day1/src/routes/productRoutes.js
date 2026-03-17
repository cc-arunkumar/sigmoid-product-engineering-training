const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/products', productController.getAllProducts);

router.get("/product/:id", productController.getProductById);

router.post("/products", productController.createProduct);

router.put("/product/:id", productController.updateProduct);




module.exports = router;