const express = require("express")
const router=express.Router();//have multiple paths from here
const productController=require("../controllers/productController");
const validateProduct=require("../middleware/validateProduct");
const validatePartialProduct=require("../middleware/validatePartialProduct");
router.get("/products",productController.getAllProducts);
router.get("/products/:id",productController.getProductById);
router.post("/products",validateProduct,productController.createProduct);
router.put("/products/:id",validateProduct,productController.updateProduct);
router.delete("/products/:id",productController.deleteProduct);
router.patch("/products/:id",validatePartialProduct,productController.updatePartialProduct);
module.exports=router;