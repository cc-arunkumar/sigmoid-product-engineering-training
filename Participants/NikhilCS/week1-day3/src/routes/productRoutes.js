//using default exports then go for this
const express = require("express");
const validator=require("../middleware/validateProduct")
const patchvalidator=require("../middleware/validateProductPartial")
const router = express.Router(); //created a router here we can create multiple routes now ,from here we can have multiple paths or routers now
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const productController = require("../controllers/productController"); //imported the controller here from controller file  ,this is one path
router.get("/api/products", productController.getAllProducts);
router.get("/api/product/:id",productController.getProductById);
router.post("/api/products",protect,authorize('admin','user'),validator,productController.createProduct)
router.put("/api/product/:id",protect,authorize('admin','user'),validator,productController.updateProduct);
router.patch("/api/product/:id",protect,authorize('admin'),patchvalidator,productController.updatePartialProduct);
router.delete("/api/product/:id",protect,authorize('admin'),productController.deleteProduct);
module.exports=router