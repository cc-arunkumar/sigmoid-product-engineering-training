import { getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,partialUpdate } from "../controllers/product_controller.js";
import express from "express"
const router=express.Router();
router.get("/api/products",getAllProducts)
router.get("/api/products/:id", getProductById)
router.post("/api/products",createProduct)
router.put("/api/products/:id",updateProduct)
router.delete("/api/products/:id",deleteProduct)
router.patch("/api/products/:id",partialUpdate)
export default router;