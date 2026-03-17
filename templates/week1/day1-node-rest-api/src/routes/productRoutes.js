import express from "express";
import { getAllProducts,getProductById , createProduct} from "../controllers/productControllers.js";
const router = express.Router();
router.get("/products" , getAllProducts);
router.get("/product/:id" ,getProductById);
router.post("/products" ,createProduct);
export default router;