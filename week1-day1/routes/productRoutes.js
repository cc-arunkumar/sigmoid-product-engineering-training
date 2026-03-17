const express = require("express");
const { getAll, getProduct, addProduct, updateProduct, partialUpdateProduct, deleteProduct } = require("../controllers/productControllers");
const router = express.Router();

router.get("/products", getAll);
router.get("/product/:id", getProduct);
router.post("/product", addProduct);
router.put("/product/:id", updateProduct);
router.patch("/product/:id", partialUpdateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;