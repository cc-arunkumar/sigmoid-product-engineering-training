const express=require("express");
const router=express.Router();
const productController=require("../controllers/productController")

const validateProduct=require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");

router.get("/api/products",productController.getProducts)

router.get("/api/product/:id",productController.getProductById)

router.post("/api/product",validateProduct,productController.createProduct)

router.put("/api/product/:id",validateProduct,productController.updateProduct)

router.delete("/api/product/:id",productController.deleteProduct)

router.patch("/api/product/:id",validateProductPartial,productController.updatePartialProduct) 

// router.get("/api/products",productController.getProducts)
// router.get("/api/product/:id",productController.getProductById)
// router.post("/api/product",productController.createProduct)
// router.put("/api/product/:id",productController.updateProduct)
// router.delete("/api/product/:id",productController.deleteProduct)
// router.patch("/api/product/:id",productController.updatePartialProduct)

module.exports=router;