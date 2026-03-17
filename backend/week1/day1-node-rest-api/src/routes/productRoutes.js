const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getAllproducts);
router.get("/:productId", productController.getProductsById);
router.post("/", productController.createPost);
router.patch("/:productId", productController.editPost);
router.put("/:productId", productController.updatePost);
router.delete("/:productId", productController.deletePost);

module.exports = router;
