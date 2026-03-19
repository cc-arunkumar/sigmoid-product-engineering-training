const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const validatePatchProduct = require("../middleware/validateProductPartial");

const protect = require("../middleware/authMiddleware")

const authorize = require("../middleware/authorize");

const cache = require("../middleware/cache");
const { createProductMongo } = require('../controllers/productMongoController');

router.get("/", cache(60000), productController.getAllProducts);
router.get("/:id", cache(60000), productController.getProductById);

router.post(
    "/",
    protect,
    authorize("user"),
    validateProduct,
    createProductMongo
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
    authorize("user"),
    productController.updatePartialProduct
);


router.delete("/:id",protect, authorize("user"), productController.deleteProductById);


module.exports = router;

