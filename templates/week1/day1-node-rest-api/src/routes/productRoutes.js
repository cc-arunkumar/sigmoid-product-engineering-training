const express = require("express");


const router = express.Router(); //for multiple paths

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePartialProduct = require("../middleware/validatePartialProduct");
const protect = require("../middleware/middleauth");

router.get("/products",productController.getAllProducts);
router.get("/product/:id",productController.getProductById);
router.post("/products",protect,validateProduct,productController.createProduct);
router.put("/product/:id",protect,validateProduct,productController.updateProduct);
router.delete("/product/:id",protect,productController.deleteProduct);
router.patch("/product/:id",protect,validatePartialProduct,productController.patchProduct);
module.exports=router;