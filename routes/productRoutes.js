const express = require("express")
const router = express.Router();
const productController = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");
const validateProductPatch = require("../middlewares/validateProductPatch");
router.get("/api/products" , productController.getALLProducts);
router.get("/api/products/:id", productController.getProductById);
router.post("/api/products/create" ,validateProduct, productController.createProduct);
router.put("/api/products/:id" ,validateProduct, productController.updateProduct);
router.delete('/api/products/delete/:id', productController.deleteProduct)
router.patch('/api/products/:id' , validateProductPatch, productController.patchProduct)
module.exports = router;