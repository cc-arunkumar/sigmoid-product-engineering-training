const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/productControllers")

router.get("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProductById);

module.exports = router;