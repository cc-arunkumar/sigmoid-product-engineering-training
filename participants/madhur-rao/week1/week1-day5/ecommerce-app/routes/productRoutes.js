const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePartialProduct = require("../middleware/validatePartialProduct");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

// GET all products
router.get("/",cache(60000), productController.getAllProducts);

// GET product by ID
router.get("/:id", cache(60000),productController.getProductById);

// CREATE product
router.post("/",authMiddleware,authorize("admin","user"),validateProduct,productController.createProduct);

// UPDATE product
router.put("/:id",authMiddleware,authorize("admin","user"),validateProduct,productController.updateProduct);

// PATCH product
router.patch("/:id",authMiddleware,authorize("admin"),validatePartialProduct,productController.patchProduct);

// DELETE product
router.delete("/:id",authMiddleware,authorize("admin"),productController.deleteProduct);

module.exports = router;