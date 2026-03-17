const express= require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

router.get("/products", productController.getAllProducts);

module.exports= router;