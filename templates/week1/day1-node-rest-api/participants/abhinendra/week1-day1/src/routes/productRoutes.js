const express= require("express");

const router= express.Router();

const productController= require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const validateProductForPatch= require("../middleware/validateProductForPatch");

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductByID);

router.post(
    "/products", 
    validateProduct,
    productController.createProduct);

router.put(
    "/products/:id", 
    validateProduct,
    productController.updateProduct);

router.delete( "/products/:id", productController.deleteProduct);

router.patch(
    "/products/:id", 
    validateProductForPatch,
    productController.updatePartialProduct
);

module.exports = router;