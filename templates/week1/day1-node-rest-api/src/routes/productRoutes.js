const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");
const protect = require("../middleware/authMiddleware");

router.get("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProductById);
router.post("/products", protect, validateProduct, productControllers.createProduct);
router.put("/products/:id", protect, validateProduct, productControllers.updateProduct);
router.delete("/products/:id", protect, productControllers.deleteProduct);
router.patch("/products", protect, validateProductPartial, productControllers.patchProduct);

module.exports = router;