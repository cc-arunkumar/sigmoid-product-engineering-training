const express = require("express")

const router = express.Router()

const productController = require("../controllers/productControllers")
const validateProduct = require("../middleware/validateProduct")
const validatePartialProduct = require("../middleware/validateProductPartial") // Import the new middleware for PATCH requests
const protectRoute = require("../middleware/authMiddleware")
const authorize = require("../middleware/authorize")
const cache = require("../middleware/cache")

router.get("/products", cache(60000), productController.getAllProducts)
router.get("/product/:id", cache(60000), productController.getProductById)

router.post("/products", protectRoute,authorize("admin") , validateProduct, productController.createProduct)
router.put("/products/:id", protectRoute, authorize("admin"), validateProduct, productController.updateProduct)
router.delete("/product/:id", protectRoute, authorize("admin"), productController.deleteProduct)
router.patch("/product/:id", protectRoute, authorize("admin"), validatePartialProduct, productController.updatePartialProduct);

module.exports = router;