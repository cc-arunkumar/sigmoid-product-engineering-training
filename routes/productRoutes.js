const express=require("express")

const router=express.Router();

const productController=require("../controllers/productController.js");
const validateProduct = require("../middleware/validateProduct.js");
const validateProductPartial=require("../middleware/validateProductPartial.js");

router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductById);
router.post("/api/products", validateProduct ,productController.createProduct);
router.put("/api/products", validateProduct,productController.updateProduct); 
router.delete("/api/products/:id",productController.deleteProduct);
router.patch('/api/products/:id', validateProductPartial ,productController.patchProduct);

module.exports=router;