const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("..middleware/cache");

//base: api/products
//public routes
router.get("/products", cache(60000),productControllers.getAllProducts);
router.get("/products/:id", cache(60000),productControllers.getProductById);
router.post("/products", protect, authorize("user"),validateProduct, productControllers.createProduct);
router.put("/products/:id", protect, validateProduct,authorize("user"), productControllers.updateProduct);
router.delete("/products/:id", protect,authorize("admin"), productControllers.deleteProduct);
router.patch("/products", protect,authorize("admin"), validateProductPartial, productControllers.patchProduct);

module.exports = router;