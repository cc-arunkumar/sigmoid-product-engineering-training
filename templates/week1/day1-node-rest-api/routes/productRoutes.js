const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePartialProduct = require("../middleware/validatePartialProduct")
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// product routes
router.get("/api/products", productController.getAllProducts);

router.get("/api/product/:id", productController.getProductById);

router.post("/api/product",
    protect,
    authorize("user"),
    validateProduct,
    productController.createProduct);

router.put("/api/product/:id", 
    protect,
    authorize("admin"),
    validateProduct,
    productController.updateProduct);

router.delete("/api/product/:id",
    protect,
    authorize("admin"),
    productController.deleteProduct);

router.patch("/api/product/:id",
    protect,
    authorize("admin"),
    validatePartialProduct,
    productController.patchProduct);

module.exports = router;