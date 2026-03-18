const express = require("express")
const router = express.Router();
const productController = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");
const validateProductPatch = require("../middlewares/validateProductPatch");
const protect = require("../middlewares/authMiddlewar");
router.get("/" , productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/create" ,protect ,validateProduct, productController.createProduct);
router.put("/:id" ,protect, validateProduct, productController.updateProduct);
router.delete('/delete/:id',protect, productController.deleteProduct)
router.patch('/:id' , protect,validateProductPatch, productController.patchProduct)
module.exports = router;