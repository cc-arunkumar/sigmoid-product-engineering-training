const express = require("express");
const { updateProduct, deleteProduct, getAllProducts, getProductById, createProduct, patchProduct } = require("../controllers/productControllers");
const { validateProduct } = require("../middleware/validateProduct");
const { validatePatchProduct } = require("../middleware/validatePatchProduct");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

router.get("/products", cache(5000), getAllProducts);
router.get("/product/:id", cache(5000), getProductById);
router.post("/product", protect, authorize("user"), validateProduct, createProduct);
router.put("/product/:id", protect, authorize("user"), validateProduct, updateProduct);
router.patch("/product/:id", protect, authorize("admin"), validatePatchProduct, patchProduct);
router.delete("/product/:id", protect, authorize("admin"), deleteProduct);

module.exports = router;