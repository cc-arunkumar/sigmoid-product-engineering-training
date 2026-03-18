const express = require('express');
const router = express.Router();

const productController=require("../controllers/productControllers");
const protect = require("../middleware/authMiddleware")
const authorize= require("../middleware/authorize")
const validateProduct = require('../middleware/validateProduct');
const validateProductPartial = require('../middleware/validateProductPartial');
const cache=require("../middleware/cache");

router.get("/api/products",cache(60000),productController.getAllProducts)
router.get("/api/product/:id",cache(60000),productController.getProductById)
router.post("/api/products",protect,validateProduct,authorize("users"),productController.createProduct)
router.put("/api/product/:id",validateProduct,protect,authorize("users"),productController.updateProduct)
router.patch("/api/product/:id",validateProductPartial ,protect,authorize("admin"),productController.updateProductPartially)
router.delete("/api/product/:id",protect,authorize("admin"),productController.deleteProduct)

module.exports = router;