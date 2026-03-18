const express = require("express");


const router = express.Router(); //for multiple paths

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/validateProduct");
const validatePartialProduct = require("../middleware/validatePartialProduct");

router.get("/products",productController.getAllProducts);
router.get("/product/:id",productController.getProductById);
router.post("/products",validateProduct,productController.createProduct);
router.put("/product/:id",validateProduct,productController.updateProduct);
router.delete("/product/:id",productController.deleteProduct);
router.patch("/product/:id",validatePartialProduct,productController.updatePartialProduct);
module.exports=router;