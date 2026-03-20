const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// GET all products
router.get("/", productController.getAllProducts);

module.exports = router;
