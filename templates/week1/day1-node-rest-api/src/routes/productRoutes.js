 
const express=require("express")
const router=express.Router();
const productController=require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePatchProduct = require("../middleware/validatePatchProduct");
const protect=require("../middleware/authMiddleware")
router.get("/products/",productController.getAllProducts);
router.get("/products/:id",productController.getProductById);
router.post("/products",protect,validateProduct,productController.createProduct)
router.put("/products/:id",protect,validateProduct,productController.updateProduct)
router.patch("/products/:id",protect,validatePatchProduct,productController.partialUpdateProduct)
router.delete("/products/:id",protect,productController.deleteProduct)
module.exports=router;

