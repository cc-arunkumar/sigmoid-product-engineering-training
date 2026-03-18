const express = require("express")

const router = express.Router()

const productController = require("../controllers/productControllers")
const validateProduct = require("../middleware/validateProduct")
const validatePartialProduct = require("../middleware/validateProductPartial") // Import the new middleware for PATCH requests
const protectRoute = require("../middleware/authMiddleware")

router.get("/products", productController.getAllProducts)

router.get("/product/:id", productController.getProductById)

router.post("/products", protectRoute, validateProduct, productController.createProduct)

router.put("/products/:id", protectRoute, validateProduct, productController.updateProduct)

router.delete("/product/:id", protectRoute, productController.deleteProduct)

router.patch("/product/:id", protectRoute, validatePartialProduct, productController.updatePartialProduct);

module.exports = router;