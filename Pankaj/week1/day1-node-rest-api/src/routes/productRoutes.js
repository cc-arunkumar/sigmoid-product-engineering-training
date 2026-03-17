const express = require('express');
const router = express.Router();

const productController = require('../controllers/productControllers');
const validateProduct = require('../middleware/validateProduct'); 
const validateProductPartial = require('../middleware/validateProductPartial');

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProductById);
router.post("/api/products", validateProduct, productController.createProduct);
router.put("/api/products/:id",validateProduct, productController.updateProduct);
router.delete("/api/products/:id", productController.deleteProduct);
router.patch("/api/products/:id",validateProductPartial, productController.updatePartialProduct);


module.exports = router;