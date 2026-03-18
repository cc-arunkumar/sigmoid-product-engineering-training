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


const validateProduct = require("../middleware/validateProduct");

const validateProductForPatch= require("../middleware/validateProductForPatch");

// ✅ Make sure names MATCH EXACTLY

router.get("/api/products", productController.getAllProducts);

router.get("/api/products/:id", productController.getProductById);

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
  "/api/products/:id",
  validateProductForPatch,
  productController.patchProduct
);

router.delete("/api/products/:id", productController.deleteProduct);

module.exports = router;