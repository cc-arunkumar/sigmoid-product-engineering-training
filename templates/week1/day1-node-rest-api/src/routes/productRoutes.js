const express = require("express");

const router = express.Router(); // from here multiple routes from here 

const productController = require("../controllers/productController") //help of product controller, router to controller

// const productController = require("../controllers/productController");

router.get("/products", productController.getAllProducts); //gets the json format data from controller 

router.get("/product/:id", productController.getProdāuctById);

router.post("/products", productController.createProduct);

router.put("/product/:id", productController.updateProduct);

router.delete("/product/:id", productController.deleteProduct);

router.patch("/product/:id", productController.updatePartialProduct);

module.exports = router; //export it to app