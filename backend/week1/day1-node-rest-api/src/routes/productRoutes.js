const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getAllproducts);
router.get("/:productId", productController.getProductsById);

module.exports = router;
