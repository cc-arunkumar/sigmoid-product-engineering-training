const express=require("express")
const router = express.Router();
const productController = require("../controllers/productController.js");

router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductsById);
router.post("/api/products",productController.createProducts);
router.put("/api/products/:id",productController.updateProduct);
router.patch("/api/products/:id",productController.updatePartialProduct);
router.delete("/api/products/:id",productController.deleteProduct);
module.exports=router;