const express = require("express");

const router= express.Router();

const productController=require("../Controllers/productController")
const validateProduct = require("../Middleware/validateProduct");
const validatePartialProduct = require("../Middleware/validatePartialProduct");
const protect = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/authorize");

router.get("/products",productController.getAllProducts);
router.get("/products/:id",productController.getProductById);

router.post("/products",protect, authorize("user","admin"), validateProduct,productController.createProduct);

router.put("/products/:id",protect,authorize("user","admin"),validateProduct,productController.updateProduct);

router.delete("/products/:id", protect, authorize("admin"), productController.deleteProduct);

router.patch("/products/:id",protect, authorize("admin"), validatePartialProduct, productController.updatePartialProduct);

module.exports=router;