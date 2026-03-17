const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController")

router.get("/products", productController.getAllProducts);

router.get("/product/:id", productController.getOneProducts);



router.post("/products", productController.create);

router.put("/products/:id", productController.updateById);


// router.delete("/products/:id", productController.deleteById);

router.patch("/products/:id", productController.updatePartial);


module.exports = router;