const express = require("express");
const { getAll, getProduct } = require("../controllers/productControllers");
const router = express.Router();

router.get("/products", getAll);
router.get("/product/:id", getProduct);

module.exports = router;