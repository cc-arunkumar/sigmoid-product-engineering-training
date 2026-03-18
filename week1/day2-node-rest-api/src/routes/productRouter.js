const express= require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const validateProduct= require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");
const protect = require("../middleware/authMiddleware");

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProductById );
router.post("/api/products", protect, validateProduct,productController.createProduct);
router.put("/api/products/:id", protect, validateProduct,productController.updateP);
router.delete("/api/products/:id", protect, productController.deleteProduct);
router.patch("/api/products/:id", protect, validateProductPartial,productController.patchProduct );



module.exports= router;