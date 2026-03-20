const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
 
const validateProduct = require("../middleware/validateProduct");

const protect = require("../middleware/authMiddleware")

const authorize = require("../middleware/authorize");

const cache = require("../middleware/cache")

router.get("/", cache(60000), productController.getAllProducts);

router.get("/:id", cache(60000), productController.getProductById);



router.post("/", protect, authorize("user"), validateProduct, productController.createProduct);

router.put("/:id", protect, authorize("user"), validateProduct, productController.updateProduct);


router.delete("/:id", protect, authorize("admin"), productController.deleteProduct);

router.patch("/:id", protect, authorize("admin"), validateProduct, productController.patchProduct);


module.exports = router;