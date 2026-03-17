const express = require("express")
const router = express.Router();
const productController = require("../controllers/productController");
router.get("/api/products" , productController.getALLProducts);
router.get("/api/products/:id", productController.getProductById);
router.post("/api/products/create" , productController.createProduct);
router.put("/api/products/:id", productController.updateProduct);
router.delete('/api/products/delete/:id', productController.deleteProduct)
router.patch('/api/products/:id' , productController.patchProduct)
module.exports = router;