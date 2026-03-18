const express=require("express")
const router = express.Router();
const productController = require("../controllers/productController.js");
const validateProduct = require("../middleware/validateProduct.js");
const validatePartialProduct=require("../middleware/validateProductPartial.js");
const protect = require("../middleware/authMiddleware.js");

router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductsById);
router.post("/api/products",protect,validateProduct,productController.createProducts);
router.put("/api/products/:id",protect,validateProduct,productController.updateProduct);
router.patch("/api/products/:id",protect,validatePartialProduct,productController.patchProduct);
router.delete("/api/products/:id",protect,productController.deleteProduct);

module.exports=router;