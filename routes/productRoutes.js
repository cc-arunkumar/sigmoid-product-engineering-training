const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const protect = require("../middleware/authMiddleware");

// added /products
router.get("/products", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
// create product
router.post("/product", protect ,validateProduct , productController.createProduct);
router.put("/product/:id", protect ,validateProduct, productController.updateProduct);
router.delete("/product/:id" , protect ,  productController.deleteProduct);
router.patch("/product/:id", protect ,validateProduct ,productController.patchProduct);

module.exports = router;
