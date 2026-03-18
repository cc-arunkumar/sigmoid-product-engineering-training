const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const validatePatchProduct = require("../middleware/validateProductPartial");

const protect = require("../middleware/authMiddleware")

const authorize = require("../middleware/authorize");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post(
    "/",
    protect,
    authorize("user"),
    validateProduct,
    productController.createProduct
);
router.put(
    "/:id",
    protect,
    authorize("user"),
    validateProduct,
    productController.updateProduct
);
router.patch(
    "/:id",
    protect,
    validatePatchProduct,
    authorize("admin"),
    productController.updatePartialProduct
);


router.delete("/:id",protect, authorize("admin"), productController.deleteProductById);


module.exports = router;

