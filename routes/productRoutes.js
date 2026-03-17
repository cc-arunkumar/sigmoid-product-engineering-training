const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

// added /products
router.get("/products", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
// create product
router.post("/product", validateProduct , productController.createProduct);
router.put("/product/:id",validateProduct, productController.updateProduct);
router.delete("/product/:id" , productController.deleteProduct);
router.patch("/product/:id", productController.patchProduct);

module.exports = router;
