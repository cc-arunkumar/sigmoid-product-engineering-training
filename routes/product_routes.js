import express from "express"
import { getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,partialUpdate } from "../controllers/product_controller.js";
import protect from "../middlewares/authMiddleware.js";
import validateProduct from "../middlewares/validateProduct.js";
import validateProductPatch from "../middlewares/validateProductPatch.js";
import authorize from "../middlewares/authorize.js";
const router=express.Router();
router.get("/api/products",getAllProducts)
router.get("/api/products/:id", getProductById)
router.post("/api/products",protect,authorize("user"),validateProduct,createProduct)
router.put("/api/products/:id",protect,authorize("user"),validateProduct,updateProduct)
router.delete("/api/products/:id",protect,authorize("admin"),deleteProduct)
router.patch("/api/products/:id",protect,authorize("admin"),validateProductPatch,partialUpdate)
export default router;