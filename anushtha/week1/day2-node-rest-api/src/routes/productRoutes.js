const express = require("express")
const router=express.Router();//have multiple paths from here
const productController=require("../controllers/productController");
const validateProduct=require("../middleware/validateProduct");
const validatePartialProduct=require("../middleware/validatePartialProduct");
const protect=require("../middleware/authMiddleware");
const authorize=require("../middleware/authorize")
router.get("/products",productController.getAllProducts);
router.get("/products/:id",productController.getProductById);
router.post("/products",protect,authorize("user"),validateProduct,productController.createProduct);
router.put("/products/:id",protect,authorize("user"),validateProduct,productController.updateProduct);
router.delete("/products/:id",protect,authorize("admin"),productController.deleteProduct);
router.patch("/products/:id",protect,authorize("admin"),validatePartialProduct,productController.updatePartialProduct);
module.exports=router;