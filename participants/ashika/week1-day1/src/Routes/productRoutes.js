const express=require("express");

const router=express.Router();

const productController=require("../controllers/productController");
const validate=require("../middleware/validation");
const validateforpatch=require("../middleware/validationpatch")

router.get("/api/products", productController.getallproducts);
router.get("/api/product/:id", productController.getproductbyId);
router.post("api//products",validate, productController.createproducts);
router.put("/api/product/:id",validate, productController.updateProduct);
router.delete("/api/product/:id", productController.DeletebyId);
router.patch("/api/product/:id",validateforpatch, productController.updatePartialProduct);

module.exports=router;