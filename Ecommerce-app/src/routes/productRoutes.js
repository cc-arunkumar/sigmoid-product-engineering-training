const express = require("express")

const router = express.Router()

const productController = require("../controllers/productControllers")
const validateProduct = require("../middleware/validateProduct")
const validatePartialProduct = require("../middleware/validateProductPartial") // Import the new middleware for PATCH requests

router.get("/api/products",productController.getAllProducts)

router.get("/api/product/:id",productController.getProductById)

router.post("/api/products", validateProduct, productController.createProduct)

router.put("/api/products/:id",validateProduct,productController.updateProduct)

router.delete("/api/product/:id",productController.deleteProduct)

router.patch("/api/product/:id",validatePartialProduct, productController.updatePartialProduct);

module.exports = router;