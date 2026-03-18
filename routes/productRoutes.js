const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController")
const validateProduct = require("../middleware/validateProduct")
const validateProductPatch = require("../middleware/validateProductsPatch")

const protect = require("../middleware/authMiddleware")

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", protect, validateProduct, productController.createProduct);
router.put("/:id", protect, validateProduct, productController.updateProduct);
router.delete("/:id", protect, productController.deleteProduct);
router.patch("/:id", protect, validateProductPatch, productController.patchProduct);

module.exports = router;