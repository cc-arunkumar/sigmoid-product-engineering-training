const express=require("express");
const router=express.Router();
const productController=require("../controllers/productControllers");


router.post("/api/products",productController.createProduct);
router.put("/api/products/:id",productController.updateProduct)
router.delete("/api/products/:id",productController.deleteProduct)
router.patch("/api/products/:id",productController.updatePartialProduct)
const validateProduct=require("../middleware/validateProduct");
const validateProductPatch = require("../middleware/validateProductPatch")
router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductsById)
router.post(
    "/api/products",
    validateProduct,
    productController.createProduct
);
router.put(
    "/api/products/:id",
    validateProduct,
    productController.updateProduct
);
router.patch(
    "/api/products",
    validateProductPatch,
    productController.updatePartialProduct
);


module.exports=router;