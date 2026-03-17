import { getAllProducts,getProductById,createProduct,updateProduct } from "../controllers/product_controller.js";
import express from "express"
const router=express.Router();
router.get("/products",getAllProducts)
router.get("/products/:id", getProductById)
router.post("/products",createProduct)
router.put("/products/:id",updateProduct)
export default router;