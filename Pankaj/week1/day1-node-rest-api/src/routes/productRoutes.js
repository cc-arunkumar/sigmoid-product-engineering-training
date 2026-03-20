const express = require("express");
const router = express.Router();

const productControllers = require("../controllers/productControllers"); // ✅ IMPORTANT
const authorize = require("../middleware/authorize");

// PUBLIC
router.get("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProductById);

// ADMIN
router.post("/products", productControllers.createProduct);
router.put("/products/:id", productControllers.updateProduct);
router.patch("/products/:id", productControllers.patchProduct);
router.delete("/products/:id", productControllers.deleteProduct);

module.exports = router;