const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/productControllers")

router.get("/products", productControllers.getAllProducts);

module.exports = router;