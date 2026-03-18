const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validateProductPatch = require("../middleware/validateProductPatch");
const protect=require("../middleware/authMiddleware");
const authorize=require("../middleware/authorize")

// GET
router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProductById);

// POST
router.post("/api/products",protect,authorize("user"), validateProduct, productController.createProduct);

// PUT
router.put("/api/products/:id",protect,authorize("user"), validateProduct, productController.updateProduct);

// PATCH
router.patch("/api/products/:id",protect,authorize("admin"), validateProductPatch, productController.patchProduct);

// DELETE
router.delete("/api/products/:id",protect,authorize("admin"), productController.deleteProduct);

module.exports = router;