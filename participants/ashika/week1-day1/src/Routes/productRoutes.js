const express=require("express");

const router=express.Router();



const productController=require("../controllers/productController");
const validate=require("../middleware/validation");
const validateforpatch=require("../middleware/validationpatch");
const protect=require("../middleware/authMiddleware");
const authorize=require("../middleware/authorized");
const cache=require("../middleware/cache");

router.get("/products", cache(60000),productController.getallproducts);
router.get("/product/:id", cache(60000),productController.getproductbyId);

router.post("/products",protect,authorize("admin"),validate, productController.createproducts);
router.put("/product/:id",protect, validate, authorize("admin"), productController.updateProduct);
router.delete("/product/:id",protect, authorize("admin"), productController.DeletebyId);
router.patch("/product/:id",protect, authorize("admin"),validateforpatch, productController.updatePartialProduct);

module.exports=router;