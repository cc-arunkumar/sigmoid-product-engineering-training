const express = require("express")

const router = express.Router()

const productController = require("../controllers/productControllers")
const validateProduct = require("../middleware/validateProduct")
const validatePartialProduct = require("../middleware/validateProductPartial") // Import the new middleware for PATCH requests

router.get("/products", productController.getAllProducts)

router.get("/product/:id", productController.getProductById)

router.post("/products", validateProduct, productController.createProduct)

router.put("/products/:id", validateProduct, productController.updateProduct)

router.delete("/product/:id", productController.deleteProduct)

router.patch("/product/:id", validatePartialProduct, productController.updatePartialProduct);

module.exports = router;