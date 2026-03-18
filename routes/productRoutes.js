const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController")
const validateProduct = require("../middleware/validateProduct")
const validateProductPatch = require("../middleware/validateProductsPatch")

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", validateProduct, productController.createProduct);
router.put("/:id", validateProduct, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", validateProductPatch, productController.patchProduct);

module.exports = router;