const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const validatePatchProduct = require("../middleware/validateProductPartial");

const protect = require("../middleware/authMiddleware")

const authorize = require("../middleware/authorize");

router.get("/api/products", productController.getAllProducts);
router.get("/api/product/:id", productController.getProductById);

router.post(
    "/api/products/",
    protect,
    authorize("user"),
    validateProduct,
    productController.createProduct
);
router.put(
    "/api/product/:id",
    protect,
    authorize("user"),
    validateProduct,
    productController.updateProduct
);
router.patch(
    "/api/product/:id",
    protect,
    validatePatchProduct,
    authorize("admin"),
    productController.updatePartialProduct
);


router.delete("/api/product/:id",protect, authorize("admin"), productController.deleteProductById);


module.exports = router;

