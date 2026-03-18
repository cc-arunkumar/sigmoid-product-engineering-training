const express=require("express");

const router=express.Router();



const productController=require("../controllers/productController");
const validate=require("../middleware/validation");
const validateforpatch=require("../middleware/validationpatch");
const protect=require("../middleware/authMiddleware")

router.get("/api/products", productController.getallproducts);
router.get("/api/product/:id", productController.getproductbyId);

router.post("/api/products",protect,validate, productController.createproducts);
router.put("/api/product/:id",protect, validate,  productController.updateProduct);
router.delete("/api/product/:id",protect,  productController.DeletebyId);
router.patch("/api/product/:id",protect, validateforpatch, productController.updatePartialProduct);

module.exports=router;