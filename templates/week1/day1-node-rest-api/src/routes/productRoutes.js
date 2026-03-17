const express = require('express');
const router = express.Router();

const productController=require("../controllers/productControllers");
router.get("/api/products",productController.getAllProducts)
router.get("/api/product/:id",productController.getProductById)
module.exports = router;