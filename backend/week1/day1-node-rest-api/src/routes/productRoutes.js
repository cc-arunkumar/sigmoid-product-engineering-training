const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getAllproducts);
router.get("/:productId", productController.getProductsById);
router.post("/", productController.createPost);
router.put("/:productId", productController.updatePost);
router.patch("/:productId", productController.editPost);

module.exports = router;
