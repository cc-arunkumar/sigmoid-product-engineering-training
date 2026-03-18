const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const protect = require("../middleware/authMiddleware")

router.get("/api/products", productController.getAllProducts);

router.get("/api/product/:id", productController.getProductById);



router.post("/api/products", protect, validateProduct, productController.createProduct);

router.put("/api/products/:id", protect, validateProduct, productController.updateProduct);


router.delete("/api/products/:id", protect, productController.deleteProduct);

router.patch("/api/products/:id", protect, validateProduct, productController.patchProduct);


module.exports = router;