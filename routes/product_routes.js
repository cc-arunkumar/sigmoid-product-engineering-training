import { getAllProducts } from "../controllers/product_controller.js";
import express from "express"
const router=express.Router();
router.get("/products",getAllProducts)
export default router;