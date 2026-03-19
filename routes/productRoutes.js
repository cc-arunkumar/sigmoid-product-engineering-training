const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController")
const validateProduct = require("../middleware/validateProduct")
const validateProductPatch = require("../middleware/validateProductsPatch")

const protect = require("../middleware/authMiddleware")
const authorize = require("../middleware/authorize")
const cache = require("../middleware/cache")
const productMongoControllers = require("../controllers/productMongoController")

router.get("/products", cache(60000), productController.getAllProducts);
router.get("/products/:id", cache(60000), productController.getProductById);
router.post("/products", protect, authorize("user"), validateProduct, productController.createProduct);
router.put("/products/:id", protect, validateProduct, authorize("user"), productController.updateProduct);
router.delete("/products/:id", protect, authorize("admin"), productController.deleteProduct);
router.patch("/products/:id", protect, validateProductPatch, authorize("admin"),  productController.patchProduct);

router.get("/mongo/products", productMongoControllers.getAllProducts);
router.get("/mongo/products/:id", productMongoControllers.getProductById);
router.post("/mongo/products", protect, authorize("user"), validateProduct, productMongoControllers.createProduct);
router.put("/mongo/products/:id", protect, authorize("user"), validateProduct, productMongoControllers.updateProduct);
router.delete("/mongo/products/:id", protect, authorize("admin"), productMongoControllers.deleteProduct);
router.patch("/mongo/products", protect, authorize("admin"), validateProductPatch, productMongoControllers.patchProduct);

module.exports = router;