const express= require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const validateProduct= require("../middleware/validateProduct");
const validateProductPartial = require("../middleware/validateProductPartial");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const cache = require("../middleware/cache");

//public routes

router.get("/api/products", cache(60000), authorize("user", "admin"), productController.getAllProducts);
router.get("/api/products/:id", cache(60000), authorize("user", "admin"), productController.getProductById);

//protected routes for admin only
router.post("/api/products", protect, authorize("admin"), validateProduct,productController.createProduct);
router.put("/api/products/:id", protect, authorize("admin"), validateProduct,productController.updateP);
router.delete("/api/products/:id", protect, authorize("admin"), productController.deleteProduct);
router.patch("/api/products/:id", protect, authorize("admin"), validateProductPartial,productController.patchProduct );



module.exports= router;