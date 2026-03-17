const express= require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const validateProduct= require("../middleware/validateProduct");

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProductById );
router.post("/api/products",validateProduct,productController.createProduct);
router.put("/api/products/:id",validateProduct,productController.updateP);
router.delete("/api/products/:id",productController.deleteP);
router.patch("/api/products/:id",validateProductPartial,productController.patchP );



module.exports= router;