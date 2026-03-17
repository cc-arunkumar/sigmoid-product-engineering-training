const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePatchProduct = require("../middleware/validatePatchProduct");

router.get("/", productController.getAllproducts);
router.get("/:productId", productController.getProductsById);
router.post("/", validateProduct, productController.createPost);
router.patch("/:productId", validatePatchProduct, productController.editPost);
router.put("/:productId", validateProduct, productController.updatePost);
router.delete("/:productId", productController.deletePost);

module.exports = router;
