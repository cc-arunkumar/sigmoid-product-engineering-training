import express from "express";
import { getAllProducts,getProductById} from "../controllers/productControllers.js";
const router = express.Router();
router.get("/products" , getAllProducts);
router.get("/product/:id" ,getProductById);

export default router;