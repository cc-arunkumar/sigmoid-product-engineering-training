const express = require("express");

const router = express.Router();

const productController = require("../controllers/productControllers");
const validate = require("../middleware/validate");

//product routes
router.get("/api/products", productController.getAllProducts);

router.get("/api/product/:id", productController.getProductById);

router.post("/api/product", validate, productController.createProduct);

router.put("/api/product/:id", validate, productController.updateProduct);

router.delete("/api/product/:id", productController.deleteProduct);

module.exports = router;
