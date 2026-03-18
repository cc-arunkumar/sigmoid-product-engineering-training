const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const protect = require("../middleware/authMiddleware")

const authorize = require("../middleware/authorize");

router.get("/api/products", productController.getAllProducts);

router.get("/api/product/:id", productController.getProductById);



router.post("/api/products", protect, authorize("user"), validateProduct, productController.createProduct);

router.put("/api/products/:id", protect, authorize("user"), validateProduct, productController.updateProduct);


router.delete("/api/products/:id", protect, authorize("admin"), productController.deleteProduct);

router.patch("/api/products/:id", protect, authorize("admin"), validateProduct, productController.patchProduct);


module.exports = router;