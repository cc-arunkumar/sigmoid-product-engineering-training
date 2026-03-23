const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const productMongoController = require("../controllers/productMongoController");

const validateProduct = require("../middleware/validateProduct")
const validatePartialProduct = require("../middleware/validatePartialProduct")
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache")

router.get("/", cache(60000), productMongoController.getAllProducts);

router.get("/:id", cache(60000), productMongoController.getProductById);

router.post(
    "/",
    protect,
    authorize("user"),
    validateProduct,
    productMongoController.createProduct
);

router.put(
    "/:id",
    protect,
    authorize("user"),
    validateProduct,
    productMongoController.updateProduct
);

router.patch(
    "/:id",
    protect,
    authorize("user"),
    validatePartialProduct, 
    productMongoController.updatePartialProduct
);

router.delete(
    "/:id",
    protect, 
    authorize("user"),
    productMongoController.deleteProduct
);

module.exports = router


// app - router(here junction of all routes is there) - 
// controller(contains all business logic) - data file gaye and take data from there and than go back to - 
// routes - than back to app