const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsControllers");

router.get("/products", productController.getAllProducts);