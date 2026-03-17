const express= require("express");

const router= express.Router();

const productController= require("../controllers/productController");

router.get("/api/products", productController.getAllProducts);

router.get("/api/products/:id", productController.getProductByID);

router.post("/api/products", productController.createProduct);

module.exports = router;