import express from "express";
import {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  partialUpdate,
} from "../controllers/product_controller.js";
import { createProductMongo } from "../controllers/productMongoController.js";
import protect from "../middlewares/authMiddleware.js";
import validateProduct from "../middlewares/validateProduct.js";
import validateProductPatch from "../middlewares/validateProductPatch.js";
import authorize from "../middlewares/authorize.js";
import cache from "../middlewares/cache.js";
const router = express.Router();

router.get("/api/products", cache(60000), getAllProducts);
router.get("/api/products/:id", cache(60000), getProductById);
router.post(
  "/api/products",
  protect,
  authorize("user"),
  validateProduct,
  createProductMongo,
);
router.put(
  "/api/products/:id",
  protect,
  authorize("user"),
  validateProduct,
  updateProduct,
);
router.delete("/api/products/:id", protect, authorize("admin"), deleteProduct);
router.patch(
  "/api/products/:id",
  protect,
  authorize("admin"),
  validateProductPatch,
  partialUpdate,
);
export default router;
