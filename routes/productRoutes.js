const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const cache = require
("../middleware/cache");

// added /products
router.get("/products", cache(60000) , productController.getAllProducts);
router.get("/product/:id", cache(60000) ,productController.getProductById);
// create product
router.post("/product", protect , authorize('user') ,validateProduct , productController.createProduct);
router.put("/product/:id", protect , authorize('user') ,validateProduct, productController.updateProduct);
router.delete("/product/:id" , protect , authorize('admin') , productController.deleteProduct);
router.patch("/product/:id", protect  ,authorize('admin') ,validateProduct ,productController.patchProduct);

module.exports = router;
