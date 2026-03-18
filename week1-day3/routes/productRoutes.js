const express = require("express");
const { updateProduct, deleteProduct, getAllProducts, getProductById, createProduct, patchProduct } = require("../controllers/productControllers");
const { validateProduct } = require("../middleware/validateProduct");
const { validatePatchProduct } = require("../middleware/validatePatchProduct");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const authorize = require("../middleware/authorize")

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/product", protect, authorize("user"), validateProduct, createProduct);
router.put("/product/:id", protect, authorize("user"), validateProduct, updateProduct);
router.patch("/product/:id", protect, authorize("admin"), validatePatchProduct, patchProduct);
router.delete("/product/:id", protect, authorize("admin"), deleteProduct);

module.exports = router;