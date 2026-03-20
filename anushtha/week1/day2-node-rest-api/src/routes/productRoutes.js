const express = require("express"); 

const router = express.Router(); 

  

const productController = require("../controllers/productController"); 

  

const validateProduct = require("../middleware/validateProduct"); 

const authMiddleware = require("../middleware/authMiddleware"); 

const authorize = require("../middleware/authorize"); 

  

// GET all products 

router.get("/", productController.getAllProducts); 

  

// GET product by ID 

router.get("/:id", productController.getProductById); 

  

// CREATE product 

router.post( 

    "/", 

    validateProduct, 

    authMiddleware, 

    authorize("user", "admin"), 

    productController.createProduct 

); 

  

// UPDATE product 

router.put( 

    "/:id", 

    validateProduct, 

    authMiddleware, 

    authorize("admin","user"), 

    productController.updateProduct 

); 

  

// PATCH product 

router.patch( 

    "/:id", 

    authMiddleware, 

    authorize("admin","user"), 

    productController.patchProduct 

); 

  

// DELETE product 

router.delete( 

    "/:id", 

    authMiddleware, 

    authorize("admin","user"), 

    productController.deleteProduct 

); 

  

module.exports = router; 