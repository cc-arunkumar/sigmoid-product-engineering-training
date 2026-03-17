const express=require("express")

const router=express.Router();

const productController=require("../controllers/productController.js")

router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductById);
router.post("/api/productspost",productController.postProduct);
router.put("/api/products",productController.updateProduct);
router.delete("/api/products/:id",productController.deleteProduct);
router.patch('/api/products/:id', productController.updatePartialProduct);

module.exports=router;