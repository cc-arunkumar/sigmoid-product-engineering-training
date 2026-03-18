// const express= require("express");

// const router= express.Router();

// const productController= require("../controllers/productController");

// const validateProduct = require("../middleware/validateProduct");

// const validateProductForPatch= require("../middleware/validateProductForPatch");

// router.get("/products", productController.getAllProducts);

// router.get("/products/:id", productController.getProductByID);

// router.post(
//     "/products", 
//     validateProduct,
//     productController.createProduct
// );

// router.put(
//     "/products/:id", 
//     validateProduct,
//     productController.updateProduct
// );

// router.delete( "/products/:id", productController.deleteProduct);

// router.patch(
//     "/products/:id", 
//     validateProductForPatch,
//     productController.updatePartialProduct
// );

// module.exports = router;

const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const validateProduct = require("../middleware/validateProduct");

const validateProductForPatch= require("../middleware/validateProductForPatch");

const authorize= require("../middleware/authorize");

// ✅ Make sure names MATCH EXACTLY

router.get("/api/products", productController.getAllProducts);

router.get("/api/products/:id", productController.getProductById);

router.post(
    "/api/products",
    protect, 
    authorize("user"),
    validateProduct,
    productController.createProduct
);

router.put(
    "/api/products/:id", 
    protect,
    authorize("user"),
    validateProduct,
    productController.updateProduct
);


router.patch(
  "/api/products/:id",
  protect,
  authorize("admin"),
  validateProductForPatch,
  productController.patchProduct
);

router.delete("/api/products/:id",protect,authorize("admin"), productController.deleteProduct);

module.exports = router;