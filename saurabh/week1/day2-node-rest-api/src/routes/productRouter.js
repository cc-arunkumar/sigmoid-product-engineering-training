const express= require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const validateProduct= require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

// Public routes
router.get("/", cache(60000), productController.getAllProducts);
router.get("/:id", cache(60000), productController.getProductById);


// Protected routes
router.post("/", protect, authorize("admin"), validateProduct, productController.createProduct);
router.put("/:id", protect, authorize("admin"), validateProduct, productController.updateP);
router.delete("/:id", protect, authorize("admin"), productController.deleteProduct);
router.patch("/:id", protect, authorize("admin"), validateProductPartial, productController.patchProduct);



module.exports= router;