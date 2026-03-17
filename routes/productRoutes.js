const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

router.get("/product", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);

module.exports = router


// app - router(here junction of all routes is there) - 
// controller(contains all business logic) - data file gaye and take data from there and than go back to - 
// routes - than back to app