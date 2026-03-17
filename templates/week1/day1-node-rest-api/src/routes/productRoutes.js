const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/productControllers");
const validateProduct = require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");

router.get("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProductById);
router.post("/products", validateProduct, productControllers.createProduct);
router.put("/products/:id", validateProduct, productControllers.modifyProduct);
router.delete("/products/:id", productControllers.deleteProduct);
router.patch("/products", validateProductPartial, productControllers.patchProduct);

module.exports = router;