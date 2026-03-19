const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache")
const productMongoControllers = require("../controllers/productMongoController");

router.get("/products", cache(60000), productControllers.getAllProducts);
router.get("/products/:id", cache(60000), productControllers.getProductById);
router.post("/products", protect, authorize("user"), validateProduct, productControllers.createProduct);
router.put("/products/:id", protect, authorize("user"), validateProduct, productControllers.updateProduct);
router.delete("/products/:id", protect, authorize("admin"), productControllers.deleteProduct);
router.patch("/products", protect, authorize("admin"), validateProductPartial, productControllers.patchProduct);

router.get("/mongo/products", productMongoControllers.getAllProducts);
router.get("/mongo/products/:id", productMongoControllers.getProductById);
router.post("/mongo/products", protect, authorize("user"), validateProduct, productMongoControllers.createProduct);
router.put("/mongo/products/:id", protect, authorize("user"), validateProduct, productMongoControllers.updateProduct);
router.delete("/mongo/products/:id", protect, authorize("admin"), productMongoControllers.deleteProduct);
router.patch("/mongo/products", protect, authorize("admin"), validateProductPartial, productMongoControllers.patchProduct);

module.exports = router;