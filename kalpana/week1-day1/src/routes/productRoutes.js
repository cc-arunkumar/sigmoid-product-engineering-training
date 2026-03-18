const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const validatePatchProduct = require("../middleware/validateProductPartial");

const protect = require("../middleware/authMiddleware")

router.get("/api/products", productController.getAllProducts);
router.get("/api/product/:id", productController.getProductById);

router.post(
    "/api/products/",
    protect,
    validateProduct,
    productController.createProduct
);
router.put(
    "/api/product/:id",
    validateProduct,
    productController.updateProduct
);
router.patch(
    "/api/product/:id",
    validatePatchProduct,
    productController.updatePartialProduct
);


router.delete("/api/product/:id", productController.deleteProductById);



module.exports = router;

