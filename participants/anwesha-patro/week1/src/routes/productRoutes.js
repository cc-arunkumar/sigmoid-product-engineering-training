const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

router.get("/api/products", productController.getAllProducts);

router.get("/api/product/:id", productController.getProductById);



router.post("/api/products", validateProduct, productController.createProduct);

router.put("/api/products/:id", validateProduct, productController.updateProduct);


router.delete("/api/products/:id", productController.deleteProduct);

router.patch("/api/products/:id", validateProduct, productController.patchProduct);


module.exports = router;