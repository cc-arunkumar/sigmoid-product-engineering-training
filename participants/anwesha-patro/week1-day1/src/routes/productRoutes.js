const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/validateProduct");

router.get("/api/products", productController.getAllProducts);

router.get("/api/product/:id", productController.getOneProducts);



router.post("/api/products", validateProduct, productController.create);

router.put("/api/products/:id", validateProduct, productController.updateById);


router.delete("/api/products/:id", productController.deleteById);

router.patch("/api/products/:id", validateProduct, productController.updatePartial);


module.exports = router;