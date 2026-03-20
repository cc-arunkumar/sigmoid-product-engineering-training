 
const express=require("express")
const router=express.Router();
const productController=require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePatchProduct = require("../middleware/validatePatchProduct");
const protect=require("../middleware/authMiddleware")
const authorize=require("../middleware/authorize")
const cache=require("../middleware/cache")
router.get("/products/",cache(6000),productController.getAllProducts);
router.get("/products/:id",cache(60000),productController.getProductById);
router.post("/products",protect,authorize("admin"),validateProduct,productController.createProduct)
router.put("/products/:id",protect,authorize("admin"),validateProduct,productController.updateProduct)
router.patch("/products/:id",protect,authorize("admin"),validatePatchProduct,productController.partialUpdateProduct)
router.delete("/products/:id",protect,authorize("admin"),productController.deleteProduct)
module.exports=router;

