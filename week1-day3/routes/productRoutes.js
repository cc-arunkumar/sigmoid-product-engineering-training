const express = require("express");
const { updateProduct, deleteProduct, getAllProducts, getProductById, createProduct, patchProduct } = require("../controllers/productControllers");
const { validateProduct } = require("../middleware/validateProduct");
const { validatePatchProduct } = require("../middleware/validatePatchProduct");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/product", protect, validateProduct, createProduct);
router.put("/product/:id", protect, validateProduct, updateProduct);
router.patch("/product/:id", protect, validatePatchProduct, patchProduct);
router.delete("/product/:id", protect, deleteProduct);

module.exports = router;