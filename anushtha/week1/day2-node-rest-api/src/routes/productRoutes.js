const express = require("express")
const router=express.Router();//have multiple paths from here
const productController=require("../controllers/productController");
const validateProduct=require("../middleware/validateProduct");
const validatePartialProduct=require("../middleware/validatePartialProduct");
router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductById);
router.post("/api/products",validateProduct,productController.createProduct);
router.put("/api/products/:id",validateProduct,productController.updateProduct);
router.delete("/api/products/:id",productController.deleteProduct);
router.patch("/api/products/:id",validatePartialProduct,productController.updatePartialProduct);
module.exports=router;