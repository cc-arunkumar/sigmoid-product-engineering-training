const express = require("express")
const router = express.Router();
const productController = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");
const validateProductPatch = require("../middlewares/validateProductPatch");
const protect = require("../middlewares/authMiddlewar");
const authorize = require("../middlewares/authorize");
router.get("/" , productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/create" ,protect, authorize("user"),validateProduct, productController.createProduct);
router.put("/:id" ,protect, authorize("user"), validateProduct, productController.updateProduct);
router.delete('/delete/:id',protect, authorize("admin"), productController.deleteProduct)
router.patch('/:id' , protect,authorize("admin"), validateProductPatch, productController.patchProduct)
module.exports = router;