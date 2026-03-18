const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validatePartialProduct = require("../middleware/validatePartialProduct");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache= require("../middleware/cache");

// Public routes
router.get("/api/products",cache(60000), productController.getAllProducts);
router.get("/api/products/:id",cache(60000), productController.getProductById);

// Protected routes
router.post(
    "/api/products",
    protect,
    authorize("user", "admin"),
    validateProduct,
    productController.createProduct
);

router.put(
    "/api/products/:id",
    protect,
    authorize("user", "admin"),
    validateProduct,
    productController.updateP
);

router.delete(
    "/api/products/:id",
    protect,
    authorize("admin"),   // only admin can delete
    productController.deleteP
);

router.patch(
    "/api/products/:id",
    protect,
    authorize("admin"),
    validatePartialProduct,
    productController.patchP
);

module.exports = router;