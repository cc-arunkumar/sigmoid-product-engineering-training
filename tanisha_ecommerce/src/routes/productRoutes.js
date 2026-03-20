// const express = require("express")

// const router = express.Router()

// const productController = require("../controllers/productControllers")
// const validateProduct = require("../middleware/validateProduct")
// const validatePartialProduct = require("../middleware/validateProductPartial") // Import the new middleware for PATCH requests
// const protectRoute = require("../middleware/authMiddleware")
// const authorize = require("../middleware/authorize")
// const cache = require("../middleware/cache")

// router.get("/products", cache(60000), productController.getAllProducts)
// router.get("/product/:id", cache(60000), productController.getProductById)

// router.post("/products", protectRoute,authorize("admin") , validateProduct, productController.createProduct)
// router.put("/products/:id", protectRoute, authorize("admin"), validateProduct, productController.updateProduct)
// router.delete("/product/:id", protectRoute, authorize("admin"), productController.deleteProduct)
// router.patch("/product/:id", protectRoute, authorize("admin"), validatePartialProduct, productController.updatePartialProduct);

// module.exports = router;
const express = require("express"); 

const router = express.Router(); 

  

const productController = require("../controllers/productControllers"); 

  

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

    authorize("admin"), 

    productController.createProduct 

); 

  

// UPDATE product 

router.put( 

    "/:id", 

    validateProduct, 

    authMiddleware, 

    authorize("admin"), 

    productController.updateProduct 

); 

  

// PATCH product 

router.patch( 

    "/:id", 

    authMiddleware, 

    authorize("admin"), 

    productController.patchProduct 

); 

  

// DELETE product 

router.delete( 

    "/:id", 

    authMiddleware, 

    authorize("admin"), 

    productController.deleteProduct 

); 

  

module.exports = router; 