const express=require("express")
const router = express.Router();
const productController = require("../controllers/productController.js");
const validateProduct = require("../middleware/validateProduct.js");
const validatePartialProduct=require("../middleware/validateProductPartial.js");
router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductsById);
router.post("/api/products",validateProduct,productController.createProducts);
router.put("/api/products/:id",validateProduct,productController.updateProduct);
router.patch("/api/products/:id",validatePartialProduct,productController.updatePartialProduct);
router.delete("/api/products/:id",productController.deleteProduct);

module.exports=router;