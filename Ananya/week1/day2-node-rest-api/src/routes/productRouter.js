const express= require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById );
router.post("/products",productController.createProduct);
router.put("/products/:id",productController.updateP);
router.delete("/products/:id",productController.deleteP);
router.patch("/products/:id",productController.patchP );

module.exports= router;