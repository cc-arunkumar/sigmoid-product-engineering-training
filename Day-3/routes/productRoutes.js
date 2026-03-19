const express=require("express")

const router=express.Router();

const productController=require("../controllers/productController.js");
const validateProduct = require("../middleware/validateProduct.js");
const validateProductPartial=require("../middleware/validateProductPartial.js");
const protect=require("../middleware/authMiddleware.js"); //
const authorize=require("../middleware/authorize.js");  //

//Public routes
router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductById);

//Admin only routes
router.post("/api/products", protect, authorize("user"), validateProduct, productController.createProduct);
router.put("/api/products/:id", protect, authorize("user"), validateProduct, productController.updateProduct); 
router.delete("/api/products/:id", protect, authorize("admin"), productController.deleteProduct);
// router.patch('/api/products/:id', validateProductPartial ,productController.patchProduct);
router.patch('/api/products/:id', protect, authorize("admin"), validateProductPartial ,productController.patchProduct);
module.exports=router;
