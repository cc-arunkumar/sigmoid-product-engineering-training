 
const express=require("express")
const router=express.Router();
const productController=require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePatchProduct = require("../middleware/validatePatchProduct");
router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductById);
router.post("/api/products",validateProduct,productController.createProduct)
router.put("/api/products/:id",validateProduct,productController.updateProduct)
router.patch("/api/products/:id",validatePatchProduct,productController.partialUpdateProduct)
router.delete("/api/products/:id",productController.deleteProduct)
module.exports=router;

