const express = require("express")
const router = express.Router();
const productController = require("../controllers/productController");
router.get("/products" , productController.getALLProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products/create" , productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete('/products/delete/:id', productController.deleteProduct)
router.patch('/products/:id' , productController.patchProduct)
module.exports = router;