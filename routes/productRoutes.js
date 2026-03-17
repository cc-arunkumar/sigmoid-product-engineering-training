const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController")
const validateProduct = require("../middleware/validateProduct")
const validateProductPatch = require("../middleware/validateProductsPatch")

router.get("/api/products", productController.getAllProducts);
router.get("/api/product/:id", productController.getProductById);
router.post("/api/products", validateProduct, productController.createProduct);
router.put("/api/products/:id", validateProduct, productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.patch("/products/:id",validateProductPatch, productController.updatePartialProduct);

module.exports = router;