const express = require("express");

const router= express.Router();

const productController=require("../Controllers/productController")

router.get("/products",productController.getAllProducts);

router.get("/products/:id",productController.getProductById);

router.post("/products",productController.createProduct);
