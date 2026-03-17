const express = require("express");
const { getAll, getProduct, addProduct, updateProduct, partialUpdateProduct, deleteProduct } = require("../controllers/productControllers");
const { validateProduct } = require("../middleware/validateProduct");
const router = express.Router();

router.get("/products", getAll);
router.get("/product/:id", getProduct);
router.post("/product", validateProduct, addProduct);
router.put("/product/:id", validateProduct, updateProduct);
router.patch("/product/:id", validateProduct, partialUpdateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;