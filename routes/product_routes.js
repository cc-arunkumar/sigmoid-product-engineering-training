import { getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,partialUpdate } from "../controllers/product_controller.js";
import validateProduct from "../middlewares/validateProduct.js";
import validateProductPatch from "../middlewares/validateProductPatch.js";
import express from "express"
const router=express.Router();
router.get("/api/products",getAllProducts)
router.get("/api/products/:id", getProductById)
router.post("/api/products",validateProduct,createProduct)
router.put("/api/products/:id",validateProduct,updateProduct)
router.delete("/api/products/:id",deleteProduct)
router.patch("/api/products/:id",validateProductPatch,partialUpdate)
export default router;