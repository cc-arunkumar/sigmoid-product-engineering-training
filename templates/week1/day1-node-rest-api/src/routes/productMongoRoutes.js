const express = require("express");
const router = express.Router();
const productMongoController = require("../controllers/productMongoController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

router.get("/api/v1/mongo/products",protect, cache(60000), productMongoController.getAllProducts);

router.get("/api/v1/mongo/product/:id",protect, cache(60000), productMongoController.getProductById);

router.post("/api/v1/mongo/products", protect, authorize("user"), productMongoController.createProduct);

router.put("/api/v1/mongo/product/:id", protect, authorize("user"), productMongoController.updateProduct);

router.patch("/api/v1/mongo/product/:id", protect, authorize("admin"), productMongoController.updateProductPartially);

router.delete("/api/v1/mongo/product/:id", protect, authorize("admin"), productMongoController.deleteProduct);

module.exports = router;

