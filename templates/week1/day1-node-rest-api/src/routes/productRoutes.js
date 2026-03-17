const express = require('express');
const router = express.Router();

const productController=require("../controllers/productControllers");
const validateProduct = require('../middleware/validateProduct');
const validateProductPartial = require('../middleware/validateProductPartial');

router.get("/api/products",productController.getAllProducts)
router.get("/api/product/:id",productController.getProductById)
router.post("/api/products",validateProduct,productController.createProduct)
router.put("/api/product/:id",validateProduct,productController.updateProduct)
router.patch("/api/product/:id",validateProductPartial ,productController.updateProductPartially)
router.delete("/api/product/:id",productController.deleteProduct)

module.exports = router;