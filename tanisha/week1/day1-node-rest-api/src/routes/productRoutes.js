const express=require("express")
const router = express.Router();
const productController = require("../controllers/productController.js");

router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductsById);
router.post("/api/products",productController.createProducts);
module.exports=router;