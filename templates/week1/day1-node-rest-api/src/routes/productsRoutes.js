const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsControllers");

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);

module.exports = router;