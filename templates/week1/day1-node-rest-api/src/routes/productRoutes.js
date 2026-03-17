const express = require("express");


const router = express.Router(); //for multiple paths

const productController = require("../controllers/productController");

router.get("/products",productController.getAllProducts);