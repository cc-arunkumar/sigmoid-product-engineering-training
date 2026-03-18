const express= require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const validateProduct= require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");
const errorHandler = require("../middleware/errorHandler");

router.get("/api/products", errorHandler, productController.getAllProducts);
router.get("/api/products/:id", errorHandler, productController.getProductById );
router.post("/api/products",validateProduct,productController.createProduct);
router.put("/api/products/:id",validateProduct,productController.updateP);
router.delete("/api/products/:id",errorHandler,productController.deleteP);
router.patch("/api/products/:id",validateProductPartial,productController.patchP );



module.exports= router;