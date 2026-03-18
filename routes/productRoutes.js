const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct")
const validatePartialProduct = require("../middleware/validatePartialProduct")

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post(
    "/",
    validateProduct,
    productController.createProduct
);

router.put(
    "/:id",
    validateProduct,
    productController.updateProduct
);

router.patch(
    "/:id",
    validatePartialProduct, 
    productController.updatePartialProduct
);

router.delete("/:id", productController.deleteProduct);

module.exports = router


// app - router(here junction of all routes is there) - 
// controller(contains all business logic) - data file gaye and take data from there and than go back to - 
// routes - than back to app