const express = require("express");
const { getAll, getProduct, addProduct } = require("../controllers/productControllers");
const router = express.Router();

router.get("/products", getAll);
router.get("/product/:id", getProduct);
router.post("/product", addProduct);

module.exports = router;