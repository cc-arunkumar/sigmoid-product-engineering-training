const express = require("express");

const router = express.Router();

const productController = require("../controllers/productControllers");

//product routes
router.get("/products", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);

router.post("/product", productController.createProduct);

module.exports = router;
