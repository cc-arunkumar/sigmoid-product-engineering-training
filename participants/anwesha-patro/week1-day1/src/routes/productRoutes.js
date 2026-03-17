const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController")

router.get("/api/products", productController.getAllProducts);

router.get("/api//product/:id", productController.getOneProducts);



router.post("/api//products", productController.create);

router.put("/api/products/:id", productController.updateById);


router.delete("/api/products/:id", productController.deleteById);

router.patch("/api/products/:id", productController.updatePartial);


module.exports = router;