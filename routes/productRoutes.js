const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const mongoController = require("../config/mongocontroller");
const cache = require("../middleware/cache");

// added /products
router.get("/products", cache(60000) , mongoController.getAllProducts);
router.get("/product/:id", cache(60000) ,mongoController.getProductById);
// create product
router.post("/product", protect , authorize('user') ,validateProduct , mongoController.createProduct);
router.put("/product/:id", protect , authorize('user') ,validateProduct, mongoController.updateProduct);
router.delete("/product/:id" , protect , authorize('user') , mongoController.deleteProduct);
router.patch("/product/:id", protect  ,authorize('user') ,validateProduct ,mongoController.patchProduct);

module.exports = router;
