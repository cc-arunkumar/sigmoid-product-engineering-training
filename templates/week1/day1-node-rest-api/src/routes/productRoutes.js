const express = require("express");


const router = express.Router(); //for multiple paths

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePartialProduct = require("../middleware/validatePartialProduct");
const protect = require("../middleware/middleauth");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

router.get("/products",cache(60000),productController.getAllProducts);
router.get("/product/:id",cache(60000),productController.getProductById);
router.post("/products",protect,authorize("user"),validateProduct,productController.createProduct);
router.put("/product/:id",protect,authorize("user"),validateProduct,productController.updateProduct);
router.delete("/product/:id",protect,authorize("admin"),productController.deleteProduct);
router.patch("/product/:id",protect,authorize("admin"),validatePartialProduct,productController.patchProduct);
module.exports=router;