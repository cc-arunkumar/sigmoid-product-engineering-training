const express=require("express")
const router = express.Router();
const productController = require("../controllers/productController.js");
const validateProduct = require("../middleware/validateProduct.js");
const validatePartialProduct=require("../middleware/validateProductPartial.js");
const protect = require("../middleware/authMiddleware.js");
const authorize=require("../middleware/authorize.js");
const cache=require("../middleware/cache.js");
router.get("/api/products",cache(60000),productController.getAllProducts);
router.get("/api/products/:id",cache(60000),productController.getProductsById);
//admin only
router.post("/api/products",protect,authorize("user"),validateProduct,productController.createProducts);
router.put("/api/products/:id",protect,authorize("user"),validateProduct,productController.updateProduct);
router.patch("/api/products/:id",protect,authorize("admin"),validatePartialProduct,productController.patchProduct);
router.delete("/api/products/:id",protect,authorize("admin"),productController.deleteProduct);

module.exports=router;