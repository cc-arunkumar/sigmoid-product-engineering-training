const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validatePatchProduct = require("../middleware/validatePatchProduct");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

router.get("/",protect, cache(60000), productController.getAllProducts)
.get("/:id", cache(60000), productController.getProductById)
.post("/", protect, authorize("admin"), validateProduct, productController.createProduct)
.put("/:id", protect, authorize("admin"), validateProduct, productController.updateProduct)
.patch("/:id", protect, validatePatchProduct, authorize("admin"), productController.patchProduct)
.delete("/:id", protect, authorize("admin"), productController.deleteProduct);

module.exports = router; 