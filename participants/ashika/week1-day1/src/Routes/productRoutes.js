const express=require("express");

const router=express.Router();



const productController=require("../controllers/productController");
const validate=require("../middleware/validation");
const validateforpatch=require("../middleware/validationpatch");
const protect=require("../middleware/authMiddleware");
const authorize=require("../middleware/authorized");

router.get("/api/products", productController.getallproducts);
router.get("/api/product/:id", productController.getproductbyId);

router.post("/api/products",protect,authorize("user"),validate, productController.createproducts);
router.put("/api/product/:id",protect, validate, authorize("user"), productController.updateProduct);
router.delete("/api/product/:id",protect, authorize("admin"), productController.DeletebyId);
router.patch("/api/product/:id",protect, authorize("admin"),validateforpatch, productController.updatePartialProduct);

module.exports=router;