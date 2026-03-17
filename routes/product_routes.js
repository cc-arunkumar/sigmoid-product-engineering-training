import { getAllProducts,getProductById,createProduct } from "../controllers/product_controller.js";
import express from "express"
const router=express.Router();
router.get("/products",getAllProducts)
router.get("/products/:id", getProductById)
router.post("/products",createProduct)
export default router;