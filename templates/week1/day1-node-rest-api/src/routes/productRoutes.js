const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/productControllers")

router.get("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProductById);
router.post("/products", productControllers.createProduct);
router.put("/products/:id", productControllers.modifyProduct);

module.exports = router;