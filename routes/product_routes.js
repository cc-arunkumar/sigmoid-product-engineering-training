import { getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,partialUpdate } from "../controllers/product_controller.js";
import express from "express"
const router=express.Router();
router.get("/products",getAllProducts)
router.get("/products/:id", getProductById)
router.post("/products",createProduct)
router.put("/products/:id",updateProduct)
router.delete("/products/:id",deleteProduct)
router.patch("/products/:id",partialUpdate)
export default router;