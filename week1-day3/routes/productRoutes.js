const express = require("express");
const { updateProduct, deleteProduct, getAllProducts, getProductById, createProduct, patchProduct } = require("../controllers/productControllers");
const { validateProduct } = require("../middleware/validateProduct");
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/product", validateProduct, createProduct);
router.put("/product/:id", validateProduct, updateProduct);
router.patch("/product/:id", validateProduct, patchProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;