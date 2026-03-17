const express=require("express");
const router=express.Router();
const productController=require("../controllers/productController");
const validateProduct=require("../middleware/validateProduct");
const validateProductPatch = require("../middleware/validateProductPatch")
router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id",productController.getProductById);
router.post("/api/products",productController.createProduct);
router.put("/api/products/:id",productController.updateproduct);
router.delete("/api/products/:id",productController.deleteproduct);
router.patch("/api/products/:id",productController.updatePartialProduct);

router.post("/api/products",validateProduct,productController.createProduct);
router.put("/api/products/:id",validateProduct,productController.updateproduct);
router.patch("/api/products/:id",validateProductPatch,productController.updatePartialProduct);


module.exports=router;