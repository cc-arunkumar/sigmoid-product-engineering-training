//using default exports then go for this
const express = require("express");
const router = express.Router(); //created a router here we can create multiple routes now ,from here we can have multiple paths or routers now
const productController = require("../controllers/productController"); //imported the controller here from controller file  ,this is one path
router.get("/products", productController.getAllProducts);
router.get("/product/:id",productController.getProductById);
router.post("/products",productController.createProduct)
router.put("/product/:id",productController.updateProduct);
router.patch("/product/:id",productController.updatePartialProduct);
router.delete("/product/:id",productController.deleteProduct);
module.exports=router