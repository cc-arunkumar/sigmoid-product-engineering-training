const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController")
const validateProduct = require("../middleware/validateProduct")
const validateProductPatch = require("../middleware/validateProductsPatch")

const protect = require("../middleware/authMiddleware")
const authorize = require("../middleware/authorize")

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", protect, authorize("user"), validateProduct, productController.createProduct);
router.put("/:id", protect, validateProduct, authorize("user"), productController.updateProduct);
router.delete("/:id", protect, authorize("admin"), productController.deleteProduct);
router.patch("/:id", protect, validateProductPatch, authorize("admin"),  productController.patchProduct);

module.exports = router;